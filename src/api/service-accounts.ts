import { Request, Response, Application } from 'express'

export class ServiceAccountsInterface {

    public configureApp(serviceAccounts: ServiceAccounts, app: Application) {

        app.post('/service-accounts', function (req: Request, res: Response) {
            console.log('post /service-accounts');

            let newServiceAccount = serviceAccounts.createServiceAccount(
                req.body.name,
                req.body.description
            );
            res.json(newServiceAccount);
        });

        app.get('/service-accounts', function (req: Request, res: Response) {
            console.log('get /service-accounts');

            res.json(serviceAccounts.getServiceAccounts());
        });

        app.delete('/service-accounts/:id', function (req: Request, res: Response) {
            console.log('delete /service-accounts/' + req.params.id);

            serviceAccounts.deleteServiceAccount(parseInt(req.params.id));

            res.sendStatus(200);
        });
    }
}