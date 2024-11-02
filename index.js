import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let data = [];
let nextId = 1;

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});

app.post('/data', (req, res) => {
    const { name, price } = req.body;
    const newData = { id: nextId++, name, price };
    data.push(newData);
    res.status(201).send(newData);
});

app.get('/data', (req, res) => {
    res.status(200).send(data);
});

app.get('/data/:id', (req, res) => {
    const dataItem = data.find(d => d.id === parseInt(req.params.id));
    if (!dataItem) {
        res.status(404).send('Data not found');
    } else {
        res.status(200).send(dataItem);
    }
}); 

//update data
app.put('/data/:id', (req,res) => {
    const dataItem = data.find(d => d.id === parseInt(req.params.id));
    if (!dataItem) {
        res.status(404).send('Data not found');
    }
    const { name, price } = req.body;
    dataItem.name = name;
    dataItem.price = price;
    res.status(200).send(dataItem);
})

//delete data

app.delete('/data/:id', (req,res) => {
    const index = data.findIndex(d => d.id === parseInt(req.params.id));
    if(index === -1){
        res.status(404).send('Data not found');
    }
    data.splice(index,1);
    res.status(204).send(`deleted data with id ${req.params.id}`);
})