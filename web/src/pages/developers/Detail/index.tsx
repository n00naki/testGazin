import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import api from '../../../services/api';

interface Ideveloper {
    id: number,
    nome: string,
    sexo: string,
    idade: string,
    hobby: string,
    datanascimento: Date
}

const Detail: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [developer, setDeveloper] = useState<Ideveloper>();

    useEffect(() => {
        findTask(id)
    }, [id])

    async function findTask(id: string) {
        const response = await api.get<Ideveloper>(`/developers/${id}`);
        console.log(response);

        const developer: Ideveloper = {
            id: response.data.id,
            nome: response.data.nome,
            idade: response.data.idade,
            sexo: response.data.sexo,
            hobby: response.data.hobby,
            datanascimento: response.data.datanascimento
        }

        setDeveloper(developer);
    }

    function back() {
        history.goBack();
    }

    function formateDate(date: Date | undefined) {
        return moment(date).add(1, 'days').format("DD/MM/YYYY");
    }

    return (
        <div className="container">
            <br />
            <div className="developer-header">
                <h1>
                    Developers Detail
                </h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <Card>
                <Card.Body>
                    <Card.Title>{developer?.nome}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Idade:</strong> {developer?.idade}</ListGroup.Item>
                        <ListGroup.Item><strong>Sexo:</strong> {developer?.sexo}</ListGroup.Item>
                        <ListGroup.Item><strong>Hobby:</strong> {developer?.hobby}</ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Data Nascimento: </strong> 
                            <Badge variant="info">{formateDate(developer?.datanascimento)}</Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Detail;