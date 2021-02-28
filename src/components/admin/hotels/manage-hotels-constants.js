import Stars from "../../common/stars";
import Address from "../../common/address";
import Attachments from "../../common/attachements";
import React from "react";

export const seedData = [
    {
        id: 1,
        name: 'Aaaa',
        stars: 5,
        address: 'address1',
        latitude: '',
        longitude: '',
        contactName: 'contactName1',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    },
    {
        id: 2,
        name: 'Eeee',
        stars: 0,
        address: 'address4',
        latitude: '',
        longitude: '',
        contactName: 'contactName5',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            }]
    },
    {
        id: 3,
        name: 'Eeee',
        stars: 1,
        address: 'address4',
        latitude: '',
        longitude: '',
        contactName: 'contactName5',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    },
    {
        id: 4,
        name: 'Vijuani',
        stars: 3,
        address: 'address10',
        latitude: '',
        longitude: '',
        contactName: 'contactName13',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        }]
    },
    {
        id: 5,
        name: 'Aaaa',
        stars: 5,
        address: 'address1',
        contactName: 'contactName1',
        latitude: '',
        longitude: '',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    },
    {
        id: 6,
        name: 'Eeee',
        stars: 0,
        address: 'address4',
        latitude: '',
        longitude: '',
        contactName: 'contactName5',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    },
    {
        id: 7,
        name: 'Eeee',
        stars: 2,
        address: 'address4',
        latitude: '',
        longitude: '',
        contactName: 'contactName5',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    },
    {
        id: 8,
        name: 'Vijuani',
        stars: 3,
        address: 'address10',
        latitude: '',
        longitude: '',
        contactName: 'contactName13',
        email: 'email',
        phone: 'phone',
        website: 'website.com',
        attachments: [{
            name: 'Pro',
            extension: 'pdf',
            filePath: 'http://www.africau.edu/images/default/sample.pdf'
        },
            {
                name: 'Description',
                extension: 'docx',
                filePath: 'http://www.africau.edu/images/default/sample.pdf'
            },
            {name: 'photo', extension: 'jpg', filePath: 'http://www.africau.edu/images/default/sample.pdf'}]
    }
];
export const columns = [
    {field: 'name', headerName: 'Name'},
    {
        field: 'stars', headerName: 'Stars',
        renderCell: count => <Stars count={count.value}/>,
        width: 150
    },
    {
        field: 'address',
        headerName: 'Address',
        renderCell: address =>
            <Address
                address={address.value}
                latitude={address.row.latitude}
                longitude={address.row.longitude}
            />
        ,
        width: 190
    },
    {field: 'contactName', headerName: 'Contact Name'},
    {field: 'email', headerName: 'Email'},
    {field: 'phone', headerName: 'Phone'},
    {field: 'website', headerName: 'Website'},
    {
        field: 'attachments',
        headerName: 'Attachments',
        renderCell: attachments => <Attachments attachments={attachments.value}/>,
        width: 'auto'
    }
];