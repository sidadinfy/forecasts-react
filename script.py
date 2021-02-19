#import dns
from dotenv import dotenv_values
import pymongo
import pandas as pd
from pymongo import MongoClient
config = dotenv_values(".env")
MONGO_URL = config['MONGO_URL']
MONGO_URL_PROD = config['MONGO_URL_PROD']
NODE_ENV = config['NODE_ENV']
URL = MONGO_URL
if NODE_ENV == "production":
    URL = MONGO_URL_PROD

client = pymongo.MongoClient(URL)
db = client.test
collection = db.maintains
data = pd.DataFrame(list(collection.find()))
data["stats_forecast"].mean()
result = "Mean of Statisitcal Forecast Is : " + str(data["stats_forecast"].mean())
print(result)