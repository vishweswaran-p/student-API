/** dependencies */
import express from 'express';
import path from 'path' ;
import cookieParser from 'cookie-parser';
import handler from 'handlers';
import expressValidator from 'express-validator';
import middlewareFile from 'middleware/middlewares';
import apiResponseConstant from 'constant/apiresponseconstant';
import responseConstant from '/constant/responseconstant';
import utility from 'services/utility';

export default function createApp() {

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

/**
 * @description loads all the middlewares from middleware.js array to the server
 */
let loadPreRequestMiddlewares = () => {
    middlewareFile.middlewares.forEach((middleware) => {
        app.use(middleware.run);
    });
};

/**
 * @description loads all the HTTP route files to the server
 */
let loadRoutes = () => {

    //Version 1 handlers
    app.use('/',handler);

    // 404 handler
    let catchAll = (req, res) => {
        res.$end(utility.buildResponse(apiResponseConstant.RESOURCE_NOT_FOUND));
    };

    //handles resource not found type for all method types
    app.get('*', catchAll);
    app.put('*', catchAll);
    app.post('*', catchAll);
    app.delete('*', catchAll);

    // error handler middleware
    app.use((err, req, res, next) => {
        res.status(err.status || responseConstant.HTTP_INTERNAL_SERVER_ERROR).end(err.message || 'Server error occured.');
    });
};

loadPreRequestMiddlewares();
loadRoutes();

// Error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(() => console.log(`Started server on => http://localhost:${app.get('port')} for Process Id ${process.pid}\nEstablishing Database connection...`));

return app;

}
