import { getRepository } from 'typeorm';
import { Developer } from '../entity/Developer';
import { Request, Response } from 'express';
import { QueryBuilder } from "typeorm-express-query-builder";
import { validate } from 'class-validator';

export const getDevelopers = async (request: Request, response: Response) => {

    const hasFilter = Object.keys(request.query).length > 0;
    const builder = new QueryBuilder(request.query);
    const developers = await getRepository(Developer).find(builder.build());

    if (hasFilter && developers.length === 0) {
        const filterStr = Object.entries(request.query)
            .map((q) => q.join(": "))
            .join(",");

        return response.status(404).json({ 
            message: `Developers not found with filter: ${filterStr}` 
        });
    }

    return response.status(200).json(developers);
}

export const getDeveloper = async (request: Request, response: Response) => {
    
    const { id } = request.params
    const developer = await getRepository(Developer).findOne(id);

    if (!developer){
        return response.status(404).json({message: 'Developer not found'});
    }

    return response.status(200).json(developer);
}

export const saveDeveloper = async (request: Request, response: Response) => {
    
    const repo = getRepository(Developer);
    
    const {nome, sexo, idade, hobby, datanascimento } = request.body;
    
    const developer = repo.create({
        nome,
        sexo,
        idade,
        hobby,
        datanascimento
    });

    const errors = await validate(developer);
    
    if(errors.length === 0){
        repo.save(developer);
        return response.status(201).json(developer);
    }else{
        return response.status(400).json(errors);
    }
     
}

export const updateDeveloper = async (request: Request, response: Response) => {
    const { id } = request.params
    const developer = await getRepository(Developer).update(id, request.body);

    if (developer.affected === 1) {
        const developerUpdate = await getRepository(Developer).findOne(id);

        return response.json(developerUpdate);
    }

    return response.status(404).json({ message: 'Developer not found' });
}

export const removeDeveloper = async (request: Request, response: Response) => {
    const { id } = request.params
    const developer = await getRepository(Developer).delete(id);

    if (developer.affected === 1) {

        return response.json({ message: 'Developer removed!' });
    }

    return response.status(404).json({ message: 'Developer not found' });
}