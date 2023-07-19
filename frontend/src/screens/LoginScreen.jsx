import { useEffect, useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from '../features/authSlice'
import { useLoginMutation } from '../features/usersApiSlice'
import { toast } from "react-toastify"



const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();
    const { userInfo } = useSelector(store => store.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }))
            navigate('/')
        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3">Sign In</Button>
                <Row className="py-3">
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen