import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row, Table, Tooltip } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { EditOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles
import * as request from "views/utilities/httpRequest";

function TayAo() {
    const [tayAoList, setTayAoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [statusTayAo, setStatusTayAo] = useState(null); // Assuming you have status for Tay Ao
    const [pageSize, setPageSize] = useState(5);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [formAdd] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [item, setItem] = useState(null);

    useEffect(() => {
        loadData(currentPage, pageSize, searchValue, statusTayAo);
    }, [currentPage, pageSize, searchValue, statusTayAo]);

    const loadData = async (page, size, searchValue, trangThai) => {
        try {
            const response = await request.get("/sleeve", {
                params: {
                    name: searchValue ? `%${searchValue}%` : null,
                    page, sizePage: size, trangThai
                },
            });
            setTayAoList(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const showDeleteConfirm = (item) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn xóa tay áo này?",
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleDelete(item.id);
            },
        });
    };

    const handleDelete = async (id) => {
        try {
            await request.remove(`/sleeve/${id}`);
            loadData(currentPage, pageSize, searchValue, statusTayAo);
            toast.success("Xóa thành công!");
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Xóa tay áo thất bại!");
        }
    };

    const handleAdd = (values) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn thêm tay áo này?",
            okText: "Xác nhận",
            okType: "primary",
            cancelText: "Hủy",
            async onOk() {
                try {
                    const duplicate = tayAoList.some(sleeve => sleeve.name.toLowerCase() === values.name.toLowerCase());
                    if (duplicate) {
                        toast.error("Tên tay áo đã tồn tại!");
                        return;
                    }
                    const response = await request.post("/sleeve/create", values);
                    if (response.status === 200) {
                        toast.success("Thêm tay áo thành công!");
                        setIsModalAddOpen(false);
                        formAdd.resetFields();
                        loadData(currentPage, pageSize, searchValue, statusTayAo);
                    }
                } catch (error) {
                    console.error("Error adding data:", error);
                    toast.error("Thêm tay áo thất bại!");
                }
            },
        });
    };


    const handleUpdate = (values) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn cập nhật tay áo này?",
            okText: "Xác nhận",
            okType: "primary",
            cancelText: "Hủy",
            async onOk() {
                try {
                    const duplicate = tayAoList.some(sleeve => sleeve.name.toLowerCase() === values.name.toLowerCase());
                    if (duplicate) {
                        toast.error("Tên tay áo đã tồn tại!");
                        return;
                    }
                    const response = await request.put(`/sleeve/${item.id}`, values);
                    if (response.status === 200) {
                        toast.success("Cập nhật tay áo thành công!");
                        setIsModalUpdateOpen(false);
                        formUpdate.resetFields();
                        loadData(currentPage, pageSize, searchValue, statusTayAo);
                    }
                } catch (error) {
                    console.error("Error updating data:", error);
                    toast.error("Cập nhật tay áo thất bại!");
                }
            },
        });
    };

    const handleCancelAdd = () => {
        setIsModalAddOpen(false);
        formAdd.resetFields();
    };

    const handleCancelUpdate = () => {
        setIsModalUpdateOpen(false);
        formUpdate.resetFields();
    };

    const handleEdit = (record) => {
        setItem(record);
        setIsModalUpdateOpen(true);
        formUpdate.setFieldsValue({
            name: record.name, // Điều chỉnh tên trường theo tên trường của bạn
        });
    };

    const handleSearch = (value) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    return (
        <div className="bg-white rounded-3 p-3">
            <ToastContainer />
            <h6 className=" m-2 fw-semibold">Danh sách tay áo</h6>
            <Row gutter={10} className="m-2">
                <Col span={13}>
                    <label className="mb-1">Tay áo</label>
                    <Input
                        onChange={(event) => setSearchValue(event.target.value)}
                        value={searchValue}
                        placeholder="Tìm kiếm tay áo theo tên..."
                    />
                </Col>
                <Col span={6}></Col>
                <Col span={4}>
                    <div className="mb-1">‍</div>
                    <Button
                        type="primary"
                        onClick={() => setIsModalAddOpen(true)}
                        className=" w-100"
                        style={{ backgroundColor: '#5e35b1' }}
                    >
                        <PlusOutlined /> Thêm tay áo
                    </Button>
                </Col>
            </Row>
            <Table
                dataSource={tayAoList}
                columns={[
                    {
                        title: "#",
                        dataIndex: "index",
                        key: "index",
                        className: "text-center",
                    },
                    {
                        title: "Tên Tay Áo",
                        dataIndex: "name",
                        key: "name",
                        className: "text-center",
                    },
                    {
                        title: "Trạng Thái",
                        dataIndex: "status",
                        key: "status",
                        className: "text-center",
                    },
                    {
                        title: "Ngày tạo",
                        dataIndex: "createdAt",
                        key: "createdAt",
                        className: "text-center",
                        render: (text) => moment(text).format("DD-MM-YYYY"),
                    },
                    {
                        title: "Hành Động",
                        dataIndex: "id",
                        key: "action",
                        className: "text-center",
                        render: (text, record) => (
                            <Tooltip placement="top" title="Chỉnh sửa">
                                <Button style={{ color: '#5e35b1' }} type="text" onClick={() => handleEdit(record)}>
                                    <i className="fas fa-edit "><IconEdit /></i>
                                </Button>
                            </Tooltip>
                        ),
                    },
                ]}
                pagination={{
                    showSizeChanger: true,
                    current: currentPage,
                    pageSize: pageSize,
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                    showQuickJumper: true,
                    total: totalPages * pageSize,
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    },
                }}
                className="mt-3"
            />

            <Modal
                title="Thêm tay áo"
                visible={isModalAddOpen}
                onCancel={handleCancelAdd}
                footer={[
                    <Button key="cancel" onClick={handleCancelAdd}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => formAdd.submit()}
                        loading={false}
                    >
                        Thêm
                    </Button>,
                ]}
            >
                <Form layout="vertical" form={formAdd} onFinish={handleAdd}>
                    <Form.Item
                        label="Tên tay áo"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên tay áo!" },
                            { whitespace: true, message: "Không được chỉ là khoảng trắng!" },
                            {
                                pattern: /^[A-Za-zÀ-ỹ\s'-]+$/,
                                message: "Tên tay áo chỉ được chứa các ký tự chữ cái và không được là số!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên tay áo..." />
                    </Form.Item>
                </Form>

            </Modal>

            <Modal
                title="Chỉnh sửa tay áo"
                visible={isModalUpdateOpen}
                onCancel={handleCancelUpdate}
                footer={[
                    <Button key="cancel" onClick={handleCancelUpdate}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => formUpdate.submit()}
                        loading={false}
                    >
                        Cập nhật
                    </Button>,
                ]}
            >
                <Form layout="vertical" form={formUpdate} onFinish={handleUpdate}>
                    <Form.Item
                        label="Tên tay áo"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên tay áo!" },
                            { whitespace: true, message: "Không được chỉ là khoảng trắng!" },
                            {
                                pattern: /^[A-Za-zÀ-ỹ\s'-]+$/,
                                message: "Tên tay áo chỉ được chứa các ký tự chữ cái và không được là số!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên tay áo..." />
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
}

export default TayAo;
