import React from "react"
import StoreClearancesComponent from "../components/storeClearances"
import TokenInputComponent from "../components/tokenInput"


const HomePage: React.FC = () => {
    return (
        <div>
            <TokenInputComponent></TokenInputComponent>
            <StoreClearancesComponent></StoreClearancesComponent>
        </div>
    )
}

export default HomePage