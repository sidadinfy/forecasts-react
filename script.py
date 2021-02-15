#import dns
import pymongo
import pandas as pd
from pymongo import MongoClient
client = pymongo.MongoClient("mongodb://sid:W9kBMgib7rnZSTm@forecasts-shard-00-00.fnus4.mongodb.net:27017,forecasts-shard-00-01.fnus4.mongodb.net:27017,forecasts-shard-00-02.fnus4.mongodb.net:27017/test?ssl=true&replicaSet=atlas-ltbkho-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.test
collection = db.maintains
data = pd.DataFrame(list(collection.find()))
data["stats_forecast"].mean()
result = "Mean of Statisitcal Forecast Is : " + str(data["stats_forecast"].mean())
print(result)