from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
import pickle
import json

model = pickle.load(open('randomForestRegressionModel.pkl', 'rb'))

def scoreJson(request):
    Fuel_Type_Petrol = None
    Fuel_Type_Diesel = None
    Seller_Type_Individual = None
    Transmission_Mannual = None

    if request.method == 'POST':
        data = json.loads(request.body)
        Year = 2021- int(data['Year'])
        Present_Price = float(data['Present_Price'])
        Kms_Driven = int(data['Kms_Driven'])
        Number_Of_Owner = int(data['Number_Of_Owner'])
        Fuel_Type = data['Fuel_Type']
        Seller_Type = data['Seller_Type']
        Transmission_Type = data['Transmission_Type']


        if(Fuel_Type == 'Petrol'):
            Fuel_Type_Petrol = 1
            Fuel_Type_Diesel = 0
        elif(Fuel_Type == 'Diesel'):
            Fuel_Type_Petrol = 0
            Fuel_Type_Diesel = 1
        else:
            Fuel_Type_Petrol = 0
            Fuel_Type_Diesel = 0
        
        if(Seller_Type == 'Individual'):
            Seller_Type_Individual = 1
        else:
            Seller_Type_Individual = 0

        if(Transmission_Type == 'Mannual'):
            Transmission_Mannual = 1
        else:
            Transmission_Mannual = 0

        prediction = model.predict([[Present_Price, Kms_Driven, Number_Of_Owner, Year, Fuel_Type_Diesel, Fuel_Type_Petrol, Seller_Type_Individual, Transmission_Mannual]])
        
        output = round(prediction[0], 2)

        if output < 0:
            return JsonResponse({"score":"Sorry you cannot sell this car"})
        else:
            return JsonResponse({"score":"You Can Sell The Car at {} lakhs".format(output)})
    
