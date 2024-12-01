import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import api from '../../services/api';

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.get('/usuarios');
            const users = response.data;

            const user = users.find(u => u.email === email && u.senha === senha);

            if (user) {
                console.log(`Login successful, Welcome ${user.nome}!`);
                navigation.navigate('Auth', { screen: 'Home' });
            } else {
                console.log('Login failed: Email or password is incorrect');
            }
        } catch (error) {
            console.error(error);
            console.log('Login failed: An error occurred during login');
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} style={{ width: '100%', height: 200 }} />
            <Container>
                <Form>
                    <Logo />
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        secureTextEntry
                        onChangeText={setSenha}
                    />
                    <Button
                        title="Entrar"
                        noSpacing={true}
                        variant="primary"
                        onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>Crie agora mesmo.</TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}

