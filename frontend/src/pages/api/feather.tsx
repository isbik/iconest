import { NextApiRequest, NextApiResponse } from 'next';
import featherJson from '../../data/feather.json';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.send({ data: featherJson });
};
