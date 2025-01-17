import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Modal, Row, Table, Tooltip } from "antd";
import { IconEdit } from "@tabler/icons-react";
import { EditOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify styles
import * as request from "views/utilities/httpRequest";

function Material() {
    const [materialList, setMaterialList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [statusMaterial, setStatusMaterial] = useState(null);
    const [pageSize, setPageSize] = useState(5);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [formAdd] = Form.useForm();
    const [formUpdate] = Form.useForm();
    const [item, setItem] = useState(null);

    useEffect(() => {
        loadData(currentPage, pageSize, searchValue, statusMaterial);
    }, [currentPage, pageSize, searchValue, statusMaterial]);

    const loadData = async (page, size, searchValue, status) => {
        try {
            const response = await request.get("/material", {
                params: {
                    name: searchValue ? `%${searchValue}%` : null,
                    page, sizePage: size, status
                },
            });
            setMaterialList(response.data);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const showDeleteConfirm = (item) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn xóa chất liệu này?",
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
            await request.remove(`/material/${id}`);
            loadData(currentPage, pageSize, searchValue, statusMaterial);
            toast.success("Xóa thành công!");
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Xóa chất liệu thất bại!");
        }
    };

    const handleAdd = (values) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn thêm chất liệu này?",
            okText: "Xác nhận",
            okType: "primary",
            cancelText: "Hủy",
            async onOk() {
                try {
                    const duplicate = materialList.some(material => material.name.toLowerCase() === values.name.toLowerCase());
                    if (duplicate) {
                        toast.error("Tên chất liệu đã tồn tại!");
                        return;
                    }
                    const response = await request.post("/material/create", values);
                    if (response.status === 200) {
                        toast.success("Thêm chất liệu thành công!");
                        setIsModalAddOpen(false);
                        formAdd.resetFields();
                        loadData(currentPage, pageSize, searchValue, statusMaterial);
                    }
                } catch (error) {
                    console.error("Error adding data:", error);
                    toast.error("Thêm chất liệu thất bại!");
                }
            },
        });
    };

    const handleUpdate = (values) => {
        Modal.confirm({
            title: "Xác nhận",
            icon: <IconEdit />,
            content: "Bạn có chắc muốn cập nhật chất liệu này?",
            okText: "Xác nhận",
            okType: "primary",
            cancelText: "Hủy",
            async onOk() {
                try {
                    const duplicate = materialList.some(material => material.name.toLowerCase() === values.name.toLowerCase());
                    if (duplicate) {
                        toast.error("Tên chất liệu đã tồn tại!");
                        return;
                    }
                    const response = await request.put(`/material/${item.id}`, values);
                    if (response.status === 200) {
                        toast.success("Cập nhật chất liệu thành công!");
                        setIsModalUpdateOpen(false);
                        formUpdate.resetFields();
                        loadData(currentPage, pageSize, searchValue, statusMaterial);
                    }
                } catch (error) {
                    console.error("Error updating data:", error);
                    toast.error("Cập nhật chất liệu thất bại!");
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
            name: record.name,

        });
    };


    const handleSearch = (value) => {
        setSearchValue(value);
        setCurrentPage(1);
    };

    return (
        <div className="bg-white rounded-3 p-3">
            <ToastContainer />
            <h6 className="fw-semibold m-3">Danh sách chất liệu</h6>
            <Row gutter={10} className="m-2">
                <Col span={13}>
                    <label className="mb-1">Chất liệu</label>
                    <Input
                        onChange={(event) => setSearchValue(event.target.value)}
                        value={searchValue}
                        placeholder="Tìm kiếm chất liệu theo tên..."
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
                        <PlusOutlined /> Thêm chất liệu
                    </Button>
                </Col>
            </Row>
            <Table
                dataSource={materialList}
                columns={[
                    {
                        title: "#",
                        dataIndex: "index",
                        key: "index",
                        className: "text-center",
                    },
                    {
                        title: "Tên Chất Liệu",
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
                title="Thêm chất liệu"
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
                        label="Chất liệu"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên chất liệu!" },
                            { whitespace: true, message: "Không được chỉ là khoảng trắng!" },
                            {
                                pattern: /^[A-Za-zÀ-ỹ\s'-]+$/,
                                message: "Tên chất liệu chỉ được chứa các ký tự chữ cái và không được là số!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên chất liệu..." />
                    </Form.Item>
                </Form>

            </Modal>

            <Modal
                title="Chỉnh sửa chất liệu"
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
                        label="Chất liệu"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên chất liệu!" },
                            { whitespace: true, message: "Không được chỉ là khoảng trắng!" },
                            {
                                pattern: /^[A-Za-zÀ-ỹ\s'-]+$/,
                                message: "Tên chất liệu chỉ được chứa các ký tự chữ cái và không được là số!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên chất liệu..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Material;
