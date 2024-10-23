import { useEmployee } from '../../../state/hooks/useEmployee/useEmployee';

const ManageAccount = () => {

    const employee = useEmployee();

   return (
    <div>
        <div>
            <p>Foto</p>
            <img src="../../../../public/images/employee/employee.jpg" alt="imagem do funcionário" width={100}/>
            <p>Nome: {`${employee.nome}`}</p>
            <p>Email: {`${employee.email}`}</p>
            <p>Telefone: {`${employee.telefone}`}</p>
        </div>
    </div>
   )
}

export default ManageAccount;