
import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  nome: string;
  idCidade?: number;
}

interface DropdownProps {
  route: string;
  name: string;
  description: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ route, handleChange, name, description }) => {
  const [items, setItems] = useState<Array<Item>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/${route}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens no banco de dados:", error);
        setLoading(false);
      });
  }, [route]);

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(event);
  };

  const getValue = (item: Item) => {
    return route === "cities" ? item.idCidade || item.id : item.id;
  };

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <select defaultValue={""} className="input-test" name={name} onChange={onSelectChange}>
        <option value="" disabled hidden>{description}</option>
        {items.map((item) => (
          <option key={item.id} value={getValue(item)}>
            {item.nome}
          </option>
        ))}
      </select>
    </div>
  );
};