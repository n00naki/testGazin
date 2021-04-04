import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import api from '../../../services/api';

interface Ideveloper {
    nome: string,
    sexo: string,
    idade: string,
    hobby: string,
    datanascimento: string
}

const Developers: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id !== undefined) {
            findDeveloper(id)
        }
    }, [id]);

    const [model, setModel] = useState<Ideveloper>({
        nome: '',
        sexo: '',
        idade: '',
        hobby: '',
        datanascimento: ''
    });

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        const idadeInt = Number.parseInt(model.idade);

        const request = {
            nome: model.nome,
            sexo: model.sexo,
            idade: idadeInt,
            hobby: model.hobby,
            datanascimento: model.datanascimento
        }

        if (id !== undefined) {
            await api.put(`/developers/${id}`, request);
        } else {
            await api.post('/developers', request);
        }

        back();

    }

    async function findDeveloper(id: string) {

        const response = await api.get(`developers/${id}`);

        const developer: Ideveloper = {
            nome: response.data.nome,
            idade: response.data.idade,
            sexo: response.data.sexo,
            hobby: response.data.hobby,
            datanascimento: formateDate(response.data.datanascimento)
        }

        setModel(developer);
    }


    function back() {
        history.goBack();
    }

    function formateDate(date: Date) {
        return moment(date).add(1, 'days').format("YYYY-MM-DD");
    }

    return (
        <div className="container">
            <br />
            <div className="developer-header">
                <h3>
                    New Developer
                </h3>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            name="nome"
                            type="text"
                            value={model.nome}
                            placeholder="Nome"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                            name="idade"
                            type="number"
                            placeholder="26"
                            value={model.idade}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sexo</Form.Label>
                        <Form.Control
                            size="sm"
                            as="select"
                            name="sexo"
                            value={model.sexo}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            required
                        >
                            <option>Selecione...</option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hobby</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Viajar"
                            name="hobby"
                            value={model.hobby}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Data De Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="datanascimento"
                            value={model.datanascimento}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            required
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Developers;