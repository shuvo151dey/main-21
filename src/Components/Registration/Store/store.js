import React, {useState, useEffect} from "react";
import {createContainer} from "unstated-next";
import {getCollegeOptions} from "../../../Services/services.js";


const useStore = () => {
    const initialState = {
        gender_options: [
            {value: 'F', label: 'Female'},
            {value: 'M', label: 'Male'},
            {value: 'Others', label: 'Others'}
        ],
        yop_options: [
            {value: '2018', label: '2018'},
            {value: '2019', label: '2019'},
            {value: '2020', label: '2020'},
            {value: '2021', label: '2021'},
            {value: '2022', label: '2022'},
            {value: '2023', label: '2023'},
            {value: '2024', label: '2024'}
        ],
        state_options: [
            {
                "value": "Andaman and Nicobar Islands",
                "label": "Andaman and Nicobar Islands"
            },
            {
                "value": "Andhra Pradesh",
                "label": "Andhra Pradesh"
            },
            {
                "value": "Arunachal Pradesh",
                "label": "Arunachal Pradesh"
            },
            {
                "value": "Assam",
                "label": "Assam"
            },
            {
                "value": "Bihar",
                "label": "Bihar"
            },
            {
                "value": "Chandigarh",
                "label": "Chandigarh"
            },
            {
                "value": "Chhattisgarh",
                "label": "Chhattisgarh"
            },
            {
                "value": "Dadra and Nagar Haveli",
                "label": "Dadra and Nagar Haveli"
            },
            {
                "value": "Daman and Diu",
                "label": "Daman and Diu"
            },
            {
                "value": "Delhi",
                "label": "Delhi"
            },
            {
                "value": "Goa",
                "label": "Goa"
            },
            {
                "value": "Gujarat",
                "label": "Gujarat"
            },
            {
                "value": "Haryana",
                "label": "Haryana"
            },
            {
                "value": "Himachal Pradesh",
                "label": "Himachal Pradesh"
            },
            {
                "value": "Jammu and Kashmir",
                "label": "Jammu and Kashmir"
            },
            {
                "value": "Jharkhand",
                "label": "Jharkhand"
            },
            {
                "value": "Karnataka",
                "label": "Karnataka"
            },
            {
                "value": "Kerala",
                "label": "Kerala"
            },
            {
                "value": "Lakshadweep",
                "label": "Lakshadweep"
            },
            {
                "value": "Madhya Pradesh",
                "label": "Madhya Pradesh"
            },
            {
                "value": "Maharashtra",
                "label": "Maharashtra"
            },
            {
                "value": "Manipur",
                "label": "Manipur"
            },
            {
                "value": "Meghalaya",
                "label": "Meghalaya"
            },
            {
                "value": "Mizoram",
                "label": "Mizoram"
            },
            {
                "value": "Nagaland",
                "label": "Nagaland"
            },
            {
                "value": "Odisha",
                "label": "Odisha"
            },
            {
                "value": "Puducherry",
                "label": "Puducherry"
            },
            {
                "value": "Punjab",
                "label": "Punjab"
            },
            {
                "value": "Rajasthan",
                "label": "Rajasthan"
            },
            {
                "value": "Sikkim",
                "label": "Sikkim"
            },
            {
                "value": "Tamil Nadu",
                "label": "Tamil Nadu"
            },
            {
                "value": "Telangana",
                "label": "Telangana"
            },
            {
                "value": "Tripura",
                "label": "Tripura"
            },
            {
                "value": "Uttar Pradesh",
                "label": "Uttar Pradesh"
            },
            {
                "value": "Uttarakhand",
                "label": "Uttarakhand"
            },
            {
                "value": "West Bengal",
                "label": "West Bengal"
            }
        ]
    }
    let [options, setOptions] = useState(initialState);
    useEffect(() => {
        const loadCollege = async () => {
            if(localStorage.getItem("college_list") === null){
                const college_list_data = await getCollegeOptions();
                const college_list = college_list_data.message;
                let college_options = [];
                college_list.forEach(element => {
                    college_options.push({value: element.college, label: element.college});
                });
                localStorage.setItem("college_list", JSON.stringify(college_options));
                setOptions({...options, college_options: college_options});
            }
        }
        loadCollege();
    })
    return {options};
}

let Container = createContainer(useStore);
export default Container;