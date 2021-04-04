import "reflect-metadata";
import { createConnection } from "typeorm";
import { app } from './index';

createConnection().then(() => {
    app.listen(3333, () => {
        console.log("Api run :)");
    });
});