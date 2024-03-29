import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import cors from "cors";
import __dirname from "./utils.js";
import cartRouter from "./routes/carts.routes.js";
import emailRouter from "./routes/email.routes.js"
import {createMessage} from "./services/db/message.service.js";
import githubLoginRouter from "./routes/github-login.views.routes.js"
import UserExtendRouter from "./routes/custom/users.extend.routes.js";
import ProductExtendRouter from "./routes/custom/products.extend.routes.js";
import MessageExtendRouter from "./routes/custom/message.extend.routes.js";
import CartExtendRouter from "./routes/custom/cart.extend.routes.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import program from "./config/config.js";
import MongoSingleton from "./config/mongodb-singleton.js";

const app = express();
const PORT = config.port;
const mongoURL = "mongodb+srv://marianobotto92:47pjMQKnnwIQOect@clustercoder.81upg7k.mongodb.net/?retryWrites=true&w=majority";

// CORS Options
const corsOptions = {
  origin: `http://localhost:5173`,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Configuración de Session
app.use(session({
  store: MongoStore.create({
    mongoUrl: mongoURL,
    ttl: 10 * 60
  }),
  secret: "v5h2Lor01Nu0",
  resave: false,
  saveUninitialized: true
}));

// Inicialización Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Configuración del servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Conexión a MongoDB con Singleton
const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.log(error);
  }
}
mongoInstance();

// Configuración de Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log("A user connected");

  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });

  socket.on('chat message', async (data) => {
    try {
      console.log(data)
      await createMessage(data.user, data.message);
      io.emit('chat message', data);
    } catch (error) {
      console.error(error);
      socket.emit('error', { error: 'Error in chat message event' });
    }
  });
});

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Parser
app.use(cookieParser());

// Configuración de Handlebars
const hbs = exphbs.create({
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
  extname: 'hbs',
  defaultLayout: 'main',
  helpers: {
    eq: function (a, b) {
      return a === b;
    },
    getPageNumbers: function (totalPages) {
      const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
      console.log(pageNumbers);
      return pageNumbers;
    }
  }
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

// Configuración de archivos estáticos
app.use(express.static(`${__dirname}/public`));

// Rutas
app.use("/api/carts", cartRouter);
app.use("/api/email", emailRouter);
app.use("/github", githubLoginRouter);

// Custom Router
const userExtendRouter = new UserExtendRouter();
app.use("/api/extend/users", userExtendRouter.getRouter());
const productExtendRouter = new ProductExtendRouter();
app.use("/api/extend/products", productExtendRouter.getRouter());
const messageExtendRouter = new MessageExtendRouter();
app.use("/api/extend/messages", messageExtendRouter.getRouter());
const cartExtendRouter = new CartExtendRouter();
app.use("api/extend/carts", cartExtendRouter.getRouter());