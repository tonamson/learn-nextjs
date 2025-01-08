# Mainnet
mongodump --host="167.172.95.175" --port=27017 --db staking --username=masterdev --password=ttka0rd17auh8np8 --authenticationDatabase=staking

# Testnet
mongodump --host="152.42.243.161" --port=27017 --db staging --username=masterdev --password=ttka0rd17auh8np8 --authenticationDatabase=staging

mongorestore --db ombank 

mongorestore --host="152.42.243.161" --port=27017 --username=masterdev --password=ttka0rd17auh8np8 --authenticationDatabase=staging --db staging


# 27/07/2021
- Update stake
- Đồng bộ database call api user/build-all-log