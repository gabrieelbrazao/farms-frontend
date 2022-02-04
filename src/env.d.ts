interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type TFarm = {
  agriculturalArea: number;
  city: string;
  cnpj: string | null;
  cpf: string | null;
  cultures: {
    id: number;
    name: string;
  }[];
  farmName: string;
  farmerName: string;
  id: number;
  state: {
    id: number;
    name: string;
  };
  totalArea: number;
  vegetationArea: number;
  cpfCnpj: string;
};

type TForm = Omit<TFarm, "id" | "state" | "totalArea" | "cpfCnpj"> & {
  cultures: number[];
  stateId: number;
  cnpj?: string;
  cpf?: string;
};

type TChartData = {
  item: string;
  count: number;
  percent: number;
};
