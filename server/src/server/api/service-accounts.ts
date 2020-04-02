import { Request, Response, Application, NextFunction } from 'express'
import { ServiceAccountAlreadyExistsException } from "./../wrapper/model/error";

export class ServiceAccountsInterface {

    public configureApp(serviceAccounts: ServiceAccounts, app: Application) {

        app.post('/service-accounts', async function (req: Request, res: Response, next : NextFunction) {

            try {
                let newServiceAccount = await serviceAccounts.createServiceAccount(
                    req.body.name,
                    req.body.description
                );
                return res.json(newServiceAccount);
            }
            catch (err) {
                next(err);
            }
        });

        app.get('/service-accounts', async function (req: Request, res: Response, next : NextFunction) {

            try {
                res.json(await serviceAccounts.getServiceAccounts());
            }
            catch (err) {
                next(err);
            }
        });

        app.delete('/service-accounts/:id', async function (req: Request, res: Response, next : NextFunction) {

            try {
                await serviceAccounts.deleteServiceAccount(parseInt(req.params.id));

                res.sendStatus(200);    
            }
            catch (err) {
                next(err);
            }
        });
    }
}