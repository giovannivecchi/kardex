import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 15px;
    height: 100%;
    flex: 0 0 25%;
    opacity: ${props => props.done ?0.6 : 1};           

    & + div{
        border-left: 2px solid rgba(0,0,0, 0.19);
    }

    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;       
        border-radius: 10px;        

        h2{
            font-weight: 800;
            font-size: 22px;
            padding: 0 10px;          
        }

        button{
            height: 32px;
            width: 32px;
            border-radius: 10px;
            background: #0062E6;
            border: 1px solid #FFF;
            cursor: pointer;
        }
        ul{
            margin-top: 10px;            
        }
    
    }
`;

/*
Flex serio a união de 3 elementos o
flex-grow - determina a habilidade de um component esticar mais que o necessario
flex-shrink - determina a possibilidade desse ele encolher
flex-basic - tamanho base do elemento = largura
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 320px;

- Responsavel por colocar a borda na proxima lista desconsiderando o primeiro elemento que nao possua uma div
    & + div{
        border-left: 1px solid rgba(0,0,0, 0.05);
    }

-- faz com que cada header fique em um canto
    justify-content: space-between;

*/