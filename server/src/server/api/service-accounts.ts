import { Request, Response, Application } from 'express'
import { ServiceAccountAlreadyExistsException } from "./../wrapper/model/error";

export class ServiceAccountsInterface {

    public configureApp(serviceAccounts: ServiceAccounts, app: Application) {

        app.post('/service-accounts', async function (req: Request, res: Response) {
            try {
                let newServiceAccount = await serviceAccounts.createServiceAccount(
                    req.body.name,
                    req.body.description
                );
                return res.json(newServiceAccount);
            }
            catch (err) {
                console.error(err);
                if (err.name.valueOf() === new ServiceAccountAlreadyExistsException().name.valueOf()) {
                    return res.status(409).json({ errName: err.name, errMessage: err.message });
                }
                return res.status(500).json({ errName: err.name, errMessage: err.message });
            }
        });

        app.get('/service-accounts', async function (req: Request, res: Response) {

            res.json(await serviceAccounts.getServiceAccounts());
        });

        app.delete('/service-accounts/:id', async function (req: Request, res: Response) {

            await serviceAccounts.deleteServiceAccount(parseInt(req.params.id));

            res.sendStatus(200);
        });
    }
}