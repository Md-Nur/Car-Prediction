import '../style/Form.css';

import React, { useState } from 'react'

export default function Forms() {

    const [year, setYear] = useState(null)
    const [presentPrice, setPresentPrice] = useState(null)
    const [driven, setDriven] = useState(null)
    const [numberOfOwner, setNumberOfOwner] = useState(0)
    const [fuel, setFuel] = useState('Petrol')
    const [ownerType, setOwnerType] = useState('Dealer')
    const [transmissionType, setTransmissionType] = useState("Mannual")
    const [finalPrice, setFinalPrice] = useState(null)

    const handleOnChangeYear = (event) => {
        setYear(event.target.value)
    }
    const handleOnChangePresentPrice = (event) => {
        setPresentPrice(event.target.value)
    }
    const handleOnChangeDriven = (event) => {
        setDriven(event.target.value)
    }
    const handleOnChangeNumberOfOwner = (event) => {
        setNumberOfOwner(event.target.value)
    }
    const handleOnChangeFuel = (event) => {
        setFuel(event.target.value)
    }
    const handleOnChangeOwnerType = (event) => {
        setOwnerType(event.target.value)
    }
    const handleOnChangeTransmissionType = (event) => {
        setTransmissionType(event.target.value)
    }

    const handleOnSubmit = async () => {
        const bodyData = JSON.stringify({
            "Present_Price": presentPrice,
            "Kms_Driven": driven,
            "Number_Of_Owner": numberOfOwner,
            "Year": year,
            "Fuel_Type": fuel,
            "Seller_Type": ownerType,
            "Transmission_Type": transmissionType
        })

        const url = "http://127.0.0.1:8000/scoreJson"

        const reqOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: bodyData
        }

        let data = await fetch(url, reqOpt);
        let parseData = await data.json()
        setFinalPrice(parseData.score)

    }
    return (
        <>
            <div className="hero">
            </div>
            <div className="container my-3 formContainer px-5 py-5">
                <h1 className="title mb-5">Car Prediction App</h1>
                <div className="row g-3">
                    <div className="mb-3 col-md-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Year</label>
                        <input type="number" onChange={handleOnChangeYear} className="form-control" id="exampleFormControlInput1" placeholder="The year when you bought the car" value={year} />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="exampleFormControlInput2" className="form-label">What is the Showroom Price?(In lakhs)</label>
                        <input type="number" className="form-control" id="exampleFormControlInput2" placeholder="Enter the show room prize" value={presentPrice} onChange={handleOnChangePresentPrice} />
                    </div>

                    <div className="mb-3 col-md-6">
                        <label htmlFor="exampleFormControlInput3" className="form-label">How Many Kilometers Drived?</label>
                        <input type="number" className="form-control" id="exampleFormControlInput3" placeholder="Number of the length of kilometers drived by the car" value={driven} onChange={handleOnChangeDriven} />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label htmlFor="customRange2" className="form-label">How much owners previously had the car?</label>
                        <div style={{ textAlign: "center" }}>{numberOfOwner}</div>
                        <input type="range" className="form-range" min="0" max="3" id="customRange2" value={numberOfOwner} onChange={handleOnChangeNumberOfOwner} />
                    </div>
                    <div className="mb-3 col-md-4">
                        <label className="form-label">What Is the Fuel type?</label>
                        <select className="form-select" aria-label="Default select example" value={fuel} onChange={handleOnChangeFuel}>
                            <option value="Petrol" selected>Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="CNG">CNG</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label className="form-label">Are you A Dealer or Individual</label>
                        <select className="form-select" aria-label="Default select example" value={ownerType} onChange={handleOnChangeOwnerType}>
                            <option value="Dealer" selected>Dealer</option>
                            <option value="Individual">Individual</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-4">
                        <label className="form-label">Transmission type</label>
                        <select className="form-select" aria-label="Default select example" value={transmissionType} onChange={handleOnChangeTransmissionType}>
                            <option value="Mannual" selected>Mannual</option>
                            <option value="Auto">Auto</option>
                        </select>
                    </div>
                </div>
                <div className="mx-5 px-5 row">
                    <input type="submit" onClick={handleOnSubmit} className="btn btn-primary" />
                </div>
            </div>
            <div className="container my-5 r">
                <p className="btn btn-outline-light col-md-12 result">{finalPrice ? finalPrice : `Please enter data to see the predicted value`}
                </p>
            </div>
        </>
    )
}
