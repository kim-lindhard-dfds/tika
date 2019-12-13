import { Request, Response, Application } from 'express'

export class ApiKeysInterface {
    public configureApp(apiKeys: ApiKeys, app: Application) {
    
        app.post('/api-keys', function (req: Request, res: Response) {
            console.log('post /api-keys');

            let apiKey = apiKeys.createApiKey(
                parseInt(req.body.serviceAccountId),
                req.body.description
            );
            res.json(apiKey);
        });

        app.get('/api-keys', function (req: Request, res: Response) {
            console.log('get/api-keys');

            res.json(apiKeys.getApiKeys());
        });

        app.delete('/api-keys/:id', function (req: Request, res: Response) {
            console.log('delete /api-keys/' + req.params.id);

            apiKeys.deleteApiKey(req.params.id);

            res.sendStatus(200);
        });
    }
}
