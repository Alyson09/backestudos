import  express from "express" 
import cors from "cors"
import { Request, Response } from "express"



const app = express()

app.use(express.json());
app.use(cors());

const users = [
    {id: 1, name: "alyson", plalist:[
        {
            id: 1,
            name: "Me ajude a esquecer",
        }
    ]},
    {id: 2, name:"Pedro", plalist:[
        {
            
        }
    ]},
    {id: 3, name: "Lucas", plalist:[
        {

        }
    ]}
]

app.get('/', (req: Request, res: Response)=>{
    res.send("Hello express");
    res.end();    
});

app.get('/users', (req:Request, res: Response)=>{
    res.json(users);
});

app.get('/users/:userId', (req: Request, res:Response)=>{
    const idUsuario = parseInt(req.params.userId)
    
    for( const user of users)
    if(user.id == idUsuario){
        res.json(users);
        return
    }

    res.status(400).send("usuario não encontrado")
});

app.get('/search', (req:Request, res:Response)=>{
    const nameUsuario = req.query.nome 

    if(!nameUsuario){
        res.status(400).send("Erro ao encontrar usuario");
    }

    const nomeUsu = users.filter(users => (users.name.toLocaleLowerCase().includes(nameUsuario.toLocaleString())))

    res.json(nomeUsu);
});


app.post('/users/:userId/playlists ', (req:Request, res:Response)=>{
    const userId = parseInt(req.params.id)
    const plalist = req.body

    for(const user of users)
    if(user.id == userId){
        user.plalist.push(plalist) 
        res.json(plalist); 
        return;
    };

    res.status(400).send("usuario não encontrado");
});

app.listen(3000,()=>{
    console.log("Server is runnig http://localhost:3000")
})