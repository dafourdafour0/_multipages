import { useEffect, useRef, useState } from 'react'
import { Badge, Button, Form, Table, Modal } from 'react-bootstrap'
// import { fetchTodos } from '../data/todos'
import { fetchTodos } from '../component/todos'

const Todos = () => {
    const newTitileRef = useRef()
    const newIdRef = useRef()
    //                    -----------------------
    //                    |                      v
    // [fetchTodos] -> todosRaw -> [filters] -> todos
    const [todosRaw, setTodosRaw] = useState([])
    const [todos, setTodos] = useState([])

    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    const [curPage, setCurPage] = useState(1)
    const [numPages, setNumPages] = useState(3)

    useEffect(() => {
        setTodosRaw(fetchTodos())
    }, []) //load

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(
                todosRaw.filter((todo) => {
                    return todo.completed === false
                })
            )
        } else {
            setTodos(todosRaw)
        }
    }, [todosRaw, onlyWaiting])


    useEffect(() => {
        setNumPages(Math.ceil(todos.length / itemsPerPage))
    }, [todos, itemsPerPage])


    useEffect(() => {
        if (numPages <= 0) setCurPage(0)
        else if (curPage > numPages) setCurPage(numPages)
        else if (curPage <= 0) setCurPage(1)

    }, [numPages])


    const deleteClick = (id) => {
        setTodosRaw(todosRaw.filter((todo) => todo.id !== id))
    }


    const waitingClicked = (id) => {
        console.log(id)


        const foundTodo = todos.find((todo) => {
            return todo.id === id
        })
        foundTodo.completed = true

        setTodosRaw([...todosRaw]) // force to be effect (refresh)
    }

    // handle modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClicked = (id, title) => {
        if (title.trim() !== "") {
            const newTodo =
                setTodosRaw([...todosRaw, {
                    userId: 1,
                    id,
                    title,
                    completed: false
                }])
        }
        newIdRef.current.value = ""
        newTitileRef.current.value = ""

        handleClose()
    }

    return (
        <>

            {/* modal------------------------------------------------------------------------------ */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Button style={{ pointerEvents: 'none' }}>
                        <i className='bi bi-plus'></i>
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Modal.Title>Add todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control

                                value={todosRaw.reduce((prev, todo) => todo.id > prev ? todo.id : prev
                                    , -1
                                ) + 1}

                                disabled={true}
                                ref={newIdRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control placeholder="ใส่ todo " autoFocus ref={newTitileRef} />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveClicked(Number(newIdRef.current.value), newTitileRef.current.value)}>
                        Save Changes
                    </Button>
                </Modal.Footer>

            </Modal>
            {/* modal end------------------------------------------------------------------------------ */}












            {/* filters */}
            <div className='d-flex align-items-center justify-content-between mt-5'>
                <div className='d-flex align-items-center'>
                    <Form.Check // prettier-ignore
                        type='switch'
                        id='custom-switch'
                        // label='Show only waiting'
                        onChange={(e) => setOnlyWaiting(e.target.checked)}
                    />
                    <label htmlFor='custom-switch'>
                        Show only&nbsp;
                        <Button variant='warning' style={{ pointerEvents: 'none' }}>
                            waiting&nbsp;<i className='bi bi-clock'></i>
                        </Button>
                    </label>
                </div>
                <Form.Select
                    aria-label='Default select example'
                    className='w-25'
                    onChange={(e) => setItemsPerPage(e.target.value)}
                >
                    <option value={5}>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </Form.Select>
            </div>


            {/* table */}
            <div className='mt-2'>
                <Table striped hover>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center' style={{ width: '4rem' }}>
                                ID
                            </th>
                            <th className='text-center'>Title</th>
                            <th className='text-end' style={{ width: '12rem' }}>
                                Completed&nbsp;
                                <Button onClick={() => handleShow()}>
                                    <i className='bi bi-plus'></i>
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // start = (curPage -1) x itemPerPage + 1 = 0
                            // stop = curPage x itemsPerPage          = 5  
                            todos.filter((todo, index) => {
                                return index >= (curPage - 1) * itemsPerPage
                                    &&
                                    index <= curPage * itemsPerPage - 1

                            })
                                .map((todo) => {
                                    return (
                                        <tr key={todo.id}>
                                            <td className='text-center'>
                                                <Badge bg='secondary'>{todo.id}</Badge>
                                            </td>
                                            <td>{todo.title}</td>
                                            <td className='text-end'>
                                                {todo.completed ? (
                                                    <Badge bg='success'>
                                                        done&nbsp;<i className='bi bi-check'></i>
                                                    </Badge>
                                                ) : (
                                                    <Button variant='warning' onClick={() => waitingClicked(todo.id)}>
                                                        waiting&nbsp;<i className='bi bi-clock'></i>
                                                    </Button>
                                                )}
                                                &nbsp;
                                                <Button variant='danger' onClick={() => {
                                                    deleteClick(todo.id)
                                                }}>

                                                    <i className='bi bi-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                    </tbody>
                </Table>
            </div>
            {/* page control */}
            <div className='text-center mt-2'>
                <Button
                    variant='outline-primary'
                    onClick={() => setCurPage(1)}
                    disabled={curPage <= 1}
                >
                    First
                </Button>
                &nbsp;
                <Button
                    variant='outline-primary'
                    onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
                    disabled={curPage <= 1}
                >
                    Previous
                </Button>
                &nbsp;
                <span>
                    {curPage}&nbsp;/&nbsp;{numPages}
                </span>
                &nbsp;
                <Button
                    variant='outline-primary'
                    onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
                    disabled={curPage >= numPages}
                >
                    Next
                </Button>
                &nbsp;
                <Button
                    variant='outline-primary'
                    onClick={() => {
                        setCurPage(numPages)
                    }}
                    disabled={curPage >= numPages}
                >
                    Last
                </Button>
            </div>
        </>
    )
}
export default Todos
