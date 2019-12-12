import { Request, Response, Application } from 'express'

export class ServiceAccountsInterface{

    public configureApp(app : Application){
        app.get('/service-accounts', function(req: Request, res :Response){
           console.log('get /service-accounts');
           res.sendStatus(200);
        });
    }
}