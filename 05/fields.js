/* eslint-disable no-useless-escape */
const fields = [
    {
        name: 'firstName',
        label: 'First name: ',
        pattern: '^[a-zA-Z –-]+$',
    },
    {
        name: 'lastName',
        label: 'Last name: ',
        pattern: '^[a-zA-Z –-]+$',
    },
    {
        name: 'email',
        label: 'E-mail: ',
    },
    {
        name: 'phoneNumber',
        label: 'Phone number: ',
        required: false,
        pattern: '^[1-9]{9}$',
    },
    {
        name: 'subject',
        label: 'Subject: ',
    },
    {
        name: 'description',
        label: 'Description: ',
        htmlEl: 'textarea',
    },
];

export default fields;
