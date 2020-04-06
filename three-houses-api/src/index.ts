// ----------------------------------------
//  Express Server: 
// ---
//  Sunday, March 29 2020
// ----------------------------------------


// ########################################
// # Required External Modules
// ########################################
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { HousesRouter } from './routes/houses/houses.router';
import { errorHandler } from './middleware/errors/error-handler.middleware';
import { notFoundHandler } from './middleware/errors/resourceNotFound.middleware';

// Load any environmental variables from .env
// dotenv.config();

// ########################################
// # Application Variables
// ########################################
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);
const app = express();

// ########################################
// # Application Configuration
// ########################################
/** Mount all external middleware functions */
app.use(helmet());
app.use(cors());
app.use(express.json());

/** Routes */
app.use('/houses', HousesRouter);

app.use(errorHandler);
app.use(notFoundHandler);


// ########################################
// # Server Activation
// ########################################

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// ########################################
// # Webpack HMR (hot module reload)
// ########################################

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
