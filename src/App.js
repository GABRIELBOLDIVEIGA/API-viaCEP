import { useState } from "react";
import "./App.css";

function App() {
    const [endereco, setEndereco] = useState({});

    function manipularEndereco(event) {
        const cep = event.target.value;
        setEndereco({cep: cep})

        if (cep && cep.length === 8) {
            console.log("tem 8 caracteres");
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((resposta) => resposta.json())
                .then((dados) => {
                    setEndereco({
                        ...endereco,  
                        rua: dados.logradouro,
                        bairro: dados.bairro,
                        cidade: dados.localidade,
                        estado: dados.uf
                    });
                });
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <input placeholder="Digite o CEP" onChange={manipularEndereco} />
                <ul>
                    <li> CEP: {endereco.cep} </li>
                    <li> Rua: {endereco.rua} </li>
                    <li> Bairro: {endereco.bairro} </li>
                    <li> Cidade: {endereco.cidade} </li>
                    <li> Estado: {endereco.estado} </li>
                </ul>
            </header>
        </div>
    );
}

export default App;
