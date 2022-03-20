import React, {useState} from 'react';
import CertificateItem from "./UI/CertificateItem";
import {observer} from "mobx-react-lite";

const CertificatesList = ({setCertificates, searchQuery, certificates, remove}) => {
    const [order, serOrder] = useState('ASC')
    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...certificates].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCertificates(sorted)
            serOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...certificates].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setCertificates(sorted)
            serOrder('ASC')
        }
    }
    if (certificates.length > 0) {
        return (
            <div style={{backgroundColor: "white"}}>
                <table className="table table-sortable">
                    <thead className="thead-light">
                    <tr>
                        <th className="arrow"
                            onClick={() => sorting('createDate')}>
                            Datetime
                        </th>
                        <th className="arrow"
                            onClick={() => sorting('name')}>Title
                        </th>
                        <th>Tags</th>
                        <th>Description</th>
                        <th>Price</th>
                        {certificates.length !== 1 && <th>Actions</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {certificates
                        .filter((certificate) => {
                            if (searchQuery === '' || searchQuery === undefined) {
                                return certificate
                            } else if (certificate.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                                return certificate
                            } else if (certificate.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                                return certificate
                            } else if (certificate.tags.map((tag) => {
                                return tag.text.toLowerCase().includes(searchQuery.toLowerCase());
                            }).some((value) => {
                                if (value === true) {
                                    return true
                                }
                            })) {
                                return certificate
                            }
                        })
                        .map((certificate) =>
                            <CertificateItem
                                key={certificate.id}
                                certificates={certificates}
                                certificate={certificate}
                                remove={remove}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        );
    } else {
        return <div>
            <h1>Нет сертификатов</h1>
        </div>
    }
};

export default observer(CertificatesList);