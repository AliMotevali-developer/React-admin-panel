function Table(){
    const data =[
    {id:1 , title:"لپتاپ Mac" , price:"83,000,000" , status:"موجود" , date: "1405/3/29" },
    {id:2 , title:"لپتاپ HP" , price:"15,000,000" , status:"موجود" , date: "1405/3/29" },
    {id:3 , title:"لپتاپ Asus" , price:"75,000,000" , status:"موجود" , date: "1405/3/29" },
    {id:4 , title:"لپتاپ Dell" , price:"68,000,000" , status:"موجود" , date: "1405/3/29" },
    ]

    return(
        <div className="table-container">
            <table className="ad-table">
                 <thead>
                    <tr>
                        <th>عنوان</th>
                        <th>قیمت</th>
                        <th>وضعیت</th>
                        <th>تاریخ</th>
                    </tr>
                 </thead>
                 <tbody>
                    {data.map((ad)=>(
                        <tr key={ad.id}>
                            <td data-label="عنوان:">{ad.title}</td>
                            <td data-label="قیمت:">{ad.price}</td>
                            <td data-label="وضعیت:">{ad.status}</td>
                            <td data-label="تاریخ:">{ad.date}</td>
                        </tr>
                    ))}
                 </tbody>
            </table>
        </div>

    );
}
export default Table;