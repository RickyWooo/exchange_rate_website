import re
import json
import requests
import boto3
import time
import datetime
from bs4 import BeautifulSoup
client = boto3.client('dynamodb')

requestURL = 'https://wwwfile.megabank.com.tw/rates2/M001/viewF_new_02_02.asp'
raw = requests.get(requestURL)
soup = BeautifulSoup(raw.text,"html.parser")

ItemTemplate = {  
    "transaction_ts":
        {"N":"1554709588"},
    "bank_name":
        {"S": "megabank", }, 
    "currency": 
        {"S": "USD"},
    "exchange_type": 
        {"M": 
            {"spot_buy":
                {"N": "31.8000"},
            "cash_buy": 
                {"N": "31.4600"},
            "spot_sell":
                {"N": "31.9000"}, 
            "cash_sell": 
                {"N": "31.1300"}}},
}

def describeTimeStamp():
    return(int(time.time()))

def describeExchangeType():
    td_tags = soup.find_all(class_="head_td td_right")
    for td_tag in td_tags:
        string = td_tag.string
        print(string)

def describeNumOfCurrency():
    td_tags = soup.find_all(class_="con_td td_left", id="")
    return (len(td_tags))

def describeCurrencyName():
    names = soup.find_all('td',class_="con_td td_left", id="")
    currency_name = []
    for name in names:
        # extract the dollar units
        p = re.compile('[A-Z]{3}')
        name = p.search(name.string).group()
        currency_name.append(name)
    return currency_name

def describeCurrencyRate():
    td_tags = soup.find_all(class_="con_td money_td")
    rate_array = []
    for td_tag in td_tags:
        rate = td_tag.string
        if rate == '---':
            rate = '-1'
            rate_array.append(rate)
        elif rate.strip():
            rate = str(rate)
            rate_array.append(rate)
        else:
            pass
    return rate_array

def appendCurrencyRate():
    currency_rate = describeCurrencyRate()
    exchange_type = ['stock_buy','cash_buy','stock_sell','cash_sell']
    mapping = []
    temp = {}
    index = 0
    for rate in currency_rate:
        temp[exchange_type[index]] = {"N":rate}
        index = index + 1
        if index == len(exchange_type):
            mapping.append(dict(temp))
            index = 0
    return mapping

def putItem():
    client.put_item(TableName='temp', Item=ItemTemplate)

def main():
    # collect names of currency as array (e.g. HKD,USD...)
    currency_name = describeCurrencyName()
    print(currency_name)
    # collect rates of currency as array (e.g. {'cash_sell': u'31.1300', 'stock_buy': u'30.8000', 'cash_buy': u'30.4600', 'stock_sell': u'30.9000'})
    currency_rate = appendCurrencyRate()
    print(currency_rate)
    i = 0
    length = describeNumOfCurrency()

    #the following snippet of code will step by step change the Itemtemplate(Line:12) and put the item into DynamoDB based on this template 
    
    for i in range(length):
        ItemTemplate['transaction_ts']['N'] = str(describeTimeStamp())
        ItemTemplate['bank_name']['S'] = 'megabank'
        ItemTemplate['currency']['S'] = currency_name[i]
        ItemTemplate['exchange_type']['M'] = currency_rate[i]
        putItem()
        print("take a break...")
        time.sleep(3)

#describeTimeStamp()
#describeExchangeType()
#describeCurrencyName()
#describeCurrencyRate()
#appendCurrencyRate()
#describeNumOfCurrency()
#describeRawData()
#putItem()
#main()