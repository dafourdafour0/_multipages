import { useEffect, useState, useRef } from "react";
import { fetchTodos } from "../component/todos";
import { Form, Table, Badge, Button, Modal, } from "react-bootstrap";





const Todos = () => {


    const newIdRef = useRef()
    const newTitleRef = useRef()


    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemPerPage, setitemPerPage] = useState(5)
    const [numPages, setNumpages] = useState(3)
    const [curPage, setCurPage] = useState(1)





    //load
    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, [])

    // console.log(todosRaw)
    //bypass 

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter((todo) => {
                return !todo.completed
            }))
        } else {
            setTodos(todosRaw)
        }
    }, [todosRaw, onlyWaiting])


    useEffect(() => {
        setNumpages(Math.ceil(todos.length / itemPerPage))
    }, [todos, itemPerPage])


    useEffect(() => {

        if (numPages <= 0) setCurPage(0)
        else { // has todos
            if (curPage > numPages) setCurPage(numPages)
            else if (curPage <= 0) setCurPage(1)
        }

    }, [numPages])


    const waitingClick = (id) => {
        console.log(id)
        const foundTodo = todos.find((todo) => {
            return todo.id === id
        })
        foundTodo.completed = true

        setTodosRaw([...todosRaw]) // force to be effect(refesh)

    }

    const deleteClicked = (id) => {
        const remainTodosRaw = todosRaw.filter( (todo) => 
            todo.id !== id 
        )

        setTodosRaw(remainTodosRaw)
    }

    //handle modal
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClicke = (id, title) => {
        /// .....
        console.log(id, title)
        if (title.trim() !== "") {
            const newTodo = {
                "userId": 1,
                id,
                title,
                "completed": false,
            }

            setTodosRaw([...todosRaw, newTodo])

        }
        newIdRef.current.value = "  "
        newTitleRef.current.value = "  "

        handleClose()
    }


    return (
        <>
            {/* modal */}

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Add todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        {/* First Form.Group - Email address with Label */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                value={todosRaw.reduce((prev, todo) => {
                                    return todo.id > prev ? todo.id : prev
                                }, -1) + 1}
                                disabled={true}
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/* Second Form.Group - Added for the second input */}
                            <Form.Label>Title:</Form.Label>
                            <Form.Control

                                placeholder="New Todo , Here !!!"
                                autoFocus ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveClicke(Number(newIdRef.current.value), newTitleRef.current.value)

                    }>
                        Save
                    </Button>
                </Modal.Footer>


            </Modal>
            {/* modal */}
            {/* filter */}
            <Form>
                <div className='d-flex justify-content-between align-item-center'>
                    <div className="d-flex align-item-center">
                        <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            // label="Show only waiting"
                            onChange={(e) => setOnlyWaiting(e.target.checked)}
                        />
                        Show only &nbsp;<Button variant="warning" onClick={() => waitingClick(todo.id)} >Waiting&nbsp;<i className="bi bi-clock"></i></Button>
                    </div>


                    <Form.Select aria-label="Default select example" className="w-25" onChange={(e) => setitemPerPage(e.target.value)} >
                        {/* <option>Open this select menu</option> */}
                        <option value={5}>5 item per page</option>
                        <option value={10}>10 item per page</option>
                        <option value={50}>50 item per page</option>
                        <option value={100}>5 item per page</option>
                    </Form.Select>
                </div>
            </Form>


            {/* table */}
            <div className="mt-2">
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center" style={{ width: '4rem' }}>ID</th>
                            <th className="text-center">Title</th>
                            <th className="text-end" style={{ width: '12rem' }}>Completed&nbsp;
                                <Button onClick={() => handleShow()}>
                                    < i className="bi bi-plus" ></i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.filter((todo, index) => {
                                return index >= (curPage - 1) * itemPerPage &&
                                    index <= curPage * itemPerPage - 1
                            })



                                .map((todo) => {
                                    return (
                                        <tr key={todo.id}>
                                            <td className="text-center"><Badge bg="secondary">{todo.id}</Badge></td>
                                            <td>{todo.title}</td>
                                            <td className="text-end">
                                                {todo.completed ? (
                                                    <Badge bg='success' className="fs-6">done</Badge>
                                                ) : (
                                                    <Button variant="warning" onClick={() => waitingClick(todo.id)} >Waiting&nbsp;<i className="bi bi-clock"></i>
                                                    </Button>
                                                )}
                                                &nbsp;
                                                <Button
                                                    variant="danger" onClick={() => deleteClicked(todo.id)}

                                                >

                                                    <i className="bi bi-trash"></i>
                                                </Button>


                                            </td>
                                        </tr>
                                    )
                                })}

                    </tbody>
                </Table>
            </div>


            {/* page control */}
            <div className="text-center">
                <Button variant="outline-primary"
                    onClick={() => setCurPage(1)}
                    disabled={curPage === 1}>
                    First</Button>&nbsp;
                <Button variant="outline-primary"
                    disabled={curPage === 1}
                    onClick={() => {
                        if (curPage > 1) {
                            setCurPage((p) => p - 1)
                        }
                    }}>Previous</Button>&nbsp;
                <span>{curPage}&nbsp;/&nbsp;{numPages}&nbsp;</span>&nbsp;
                <Button
                    variant="outline-primary"
                    disabled={curPage === numPages}
                    onClick={() => {
                        if (curPage < numPages) {
                            setCurPage((p) => p + 1)
                        }
                    }}
                >Next</Button>&nbsp;
                <Button variant="outline-primary"
                    disabled={curPage === numPages}
                    onClick={() => setCurPage(numPages)}>
                    Last</Button>
            </div>

        </>

    );
}

export default Todos;