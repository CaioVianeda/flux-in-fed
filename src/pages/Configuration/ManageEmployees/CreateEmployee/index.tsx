import { TextField } from '@mui/material';
import style from './style.module.css';
import { Add } from '@mui/icons-material';

const CreateEmployee = () => {
    return (
        <div className={style.container__new_employee}>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      label="Nome"
                      size="small"
                      fullWidth
                      slotProps={{
                        inputLabel: {
                          style: { fontFamily: "nunito", fontSize: "15px" },
                        },
                        input: {
                          style: { fontFamily: "nunito", fontSize: "15px" },
                        },
                      }}
                      variant="standard"
                      sx={{ width: "45%" }}
                    />
                    <TextField
                      id="standard-required"
                      label="Telefone"
                      variant="standard"
                      type="tel"
                      name="telefone"
                      size="small"
                      fullWidth
                      slotProps={{
                        input: {
                          style: { fontFamily: "nunito", fontSize: "15px" },
                        },
                        inputLabel: {
                          style: { fontFamily: "nunito", fontSize: "15px" },
                        },
                      }}
                      sx={{ width: "45%" }}
                    />
                  </div>
    
                  <TextField
                    label="E-mail"
                    size="small"
                    type="email"
                    slotProps={{
                      inputLabel: {
                        style: { fontFamily: "nunito", fontSize: "15px" },
                      },
                      input: {
                        style: { fontFamily: "nunito", fontSize: "15px" },
                      },
                    }}
                    variant="standard"
                    sx={{ width: "45%" }}
                  />
    
                  <div className={style.add_employee}>
                    <Add style={{ cursor: "pointer", marginLeft: "15px" }} />
                  </div>
                </div>
    )
}

export default CreateEmployee;