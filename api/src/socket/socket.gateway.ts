import { Logger } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { JwtService } from '@nestjs/jwt'

@WebSocketGateway({ transports: ['websocket', 'polling'], cors: '*:*' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private logger: Logger = new Logger(SocketGateway.name)
    private online = 0

    constructor(private readonly jwtService: JwtService) {}

    @WebSocketServer()
    server: Server

    private connectedClients: Map<string, any> = new Map()

    afterInit(server: any): any {}

    getOnline(): number {
        return this.online
    }

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token || client.handshake.query.token
            if (token != null && token.length > 0 && token != undefined) {
                const payload = await this.jwtService.verifyAsync(token.toString())
                client.join(payload.username)
                this.connectedClients.set(payload.username, payload)
                this.logger.debug(`user connect: [${payload.username}]`)
            }
            this.online++
            this.logger.debug(`User online: [${this.getOnline()}]`)
        } catch (e) {
            this.logger.error(e.message)
        }
    }

    async handleDisconnect(client: Socket) {
        //     try {
        //         const token = client.handshake.auth.token || client.handshake.query.token
        //         if (token != null && token.length > 0 && token != undefined) {
        //             const payload = await this.jwtService.verifyAsync(token.toString())
        //             this.connectedClients.delete(payload.username)
        //             this.logger.debug(`user disconnected: [${payload.username}]`)
        //         }
        //         this.online--
        //         this.logger.debug(`User online: [${this.getOnline()}]`)
        //     } catch (e) {
        //         this.logger.error(e.message)
        //     }
    }

    @SubscribeMessage('join_client')
    async handleEvent(@MessageBody() room, @ConnectedSocket() client: Socket) {
        client.join('public_room')
    }
}
