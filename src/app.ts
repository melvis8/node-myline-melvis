// src/app.ts

import { envs } from './core/config/env';
import { HttpCode } from './core/constants';
import app from './server';
import { Request, Response } from 'express';


interface Icars  {
 matricule : string;
 color : string;
 mark : string;
 edition : number;
}

const Cars : Icars[] =[
	{
     matricule : '5CD23',
	 color : 'red',
	 mark : 'carina',
	 edition :2016,
	},
	{
		matricule : '45SDE',
		color : 'black',
		mark : 'lambogini',
		edition :2000,
	   },
	   {
		matricule : 'KF9ZE',
		color : 'white',
		mark : 'V8',
		edition :1993,
	   },
	   {
		matricule : 'CMR19',
		color : 'grey',
		mark : 'carina ',
		edition :201,
	   },
	   {
		matricule : 'XV34T',
		color : 'blue',
		mark : 'carina',
		edition :209,
	   },
			
] 



app.get('/', (req: Request, res: Response): void => {
	res.send(Cars).status(HttpCode.OK);
}),

app.get('/:matricule', (req: Request, res: Response): void => 
	{
		
		const CarMat = req.params.matricule;
		Cars.find((el) => {
			if (el.matricule === CarMat) 
			{
				res.send(el).status(HttpCode.OK);
			}
			else
			{
				res.send({ msg: "The car doesn't exist !!!" }).status(HttpCode.NOT_FOUND);
			}
		});
	},
),

app.get('/cars/:mark' , (req: Request, res: Response): void => {
	const CarMark = req.params.mark;
	const voitures = Cars.filter((el) => el.mark === CarMark);
	if (voitures) {
		res.send(voitures).status(HttpCode.OK);
	}
}),

app.listen(envs.PORT, () => {
	console.log(`Server running on port http://localhost:${envs.PORT}/`);
});
