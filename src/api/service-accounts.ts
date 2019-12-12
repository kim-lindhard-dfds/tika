import { Request, Response, Application } from 'express'

type CreateServiceAccountRequest = {
    name: string;
    description: string;
}
type CreateServiceAccountResponse = {
    id: number;
    name: string;
    description: string;
}

export class ServiceAccountsInterface {

    public configureApp(app: Application) {

        app.post('/service-accounts', function (req: Request, res: Response) {
            console.log('post /service-accounts');

            let createServiceAccountResponse: CreateServiceAccountResponse = {
                id: 12300,
                name: req.body.name,
                description: req.body.description
            };
            res.json(createServiceAccountResponse);
        });

        app.get('/service-accounts', function (req: Request, res: Response) {
            console.log('get /service-accounts');


            let userTestStatus: { id: number, name: string, description: string }[] = [
                { "id": 7432, "name": "devx-selfservice capability", "description": "devx-selfservice capability" },
                { "id": 9776, "name": "devex-infrastructure-monitoring", "description": "Used for infrastructure" },
                { "id": 11059, "name": "kim-tester-delete-me", "description": " Used to test creation of acls,  can safely be deleted at any time" }
            ];

            res.json(userTestStatus);
        });
    }
}