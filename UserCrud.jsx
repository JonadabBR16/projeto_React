import React, { Component } from "react";
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários : Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/users'
const initialState ={
    //arrumei aqui estava users e é user
    user: { name: '', email:''},
    list: []
}

export default class UserCrud extends Component{
    state = { ...initialState}

    componentWillMount (){
        axios(baseUrl).then(resp => {
            this.setState({
                list: resp.data
            })
        })
    }

    clear(){
        this.setState({
            user: initialState.user //arrumei aqui colocando .user
        })
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put': 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({
                    user: initialState.user,
                    list
                })
            })
    }

    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
            return list
    }

    updateField(event){
        const user = {
            ...this.state.user
        }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm(){
        return(
            <div className="form">
                {/* inserir as informações */}
                <div className="row">
                    {/* nome */}
                    <div className=" col-12 col-md-6">
                        <div className="form-group">
                            <label> Nome </label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..."/>
                                {/* Arrumei o value é 'name' e não nome */}
                        </div>
                    </div>
                {/* fehca nome */}
                {/* email */}
                <div className=" col-12 col-md-6">
                        <div className="form-group">
                            <label> E-mail </label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o e-mail..."/>
                        </div>
                    </div>
                    {/* fecha email */}
                </div>
                {/* fecha campo de inserir infamações */}
                <hr />
                {/* botões */}
                <div className="row">
                    <div className=" col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            salvar
                        </button>
                        <button className="btn btn-secondary ms-2" onClick={e => this.clear(e)}>
                            cancelar
                        </button>
                    </div>
                </div>
                {/* fecha botões e arrumei os espaçamentos dos botões de ml-2 so bootstrap 4 para ms-2 do bootstrap S (ml = margin-left e
                ms = margin-start */}
            </div>
        )
    }

    load(user){
        this.setState({ user })
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ms-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    {/* fecha botões e arrumei os espaçamentos dos botões de ml-2 so bootstrap 4 para ms-2 do bootstrap S (ml = margin-left e
                    ms = margin-start */}
                    </td>
                </tr>
            )
        })
    }
    render(){
        return(
            <Main{...headerProps}>
            {/* arrumei aqui, coloquei os parenteses nas funções que havia esquecido */}
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}