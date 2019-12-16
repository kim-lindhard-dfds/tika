import { Request, Response, Application } from 'express'

export class ServiceAccountsInterface {

    public configureApp(serviceAccounts: ServiceAccounts, app: Application) {

        app.post('/service-accounts', async function (req: Request, res: Response) {
            console.log('post /service-accounts');

            let newServiceAccount = await serviceAccounts.createServiceAccount(
                req.body.name,
                req.body.description
            );
            res.json(newServiceAccount);
        });

        app.get('/service-accounts', async function (req: Request, res: Response) {
            console.log('get /service-accounts');

            res.json(await serviceAccounts.getServiceAccounts());
        });

        app.delete('/service-accounts/:id', async function (req: Request, res: Response) {
            console.log('delete /service-accounts/' + req.params.id);

            await serviceAccounts.deleteServiceAccount(parseInt(req.params.id));

            res.sendStatus(200);
        });
    }
}