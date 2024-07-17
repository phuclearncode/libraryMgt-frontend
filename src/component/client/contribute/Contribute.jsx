import React, { useEffect, useState } from 'react'
import { getMemberships } from '../../../service/MemberShipService';
import useNotification from '../../../hooks/useNotification.js';
import database from '../../../database.json'
import './Contribute.css'
import { getPaymentUrl } from '../../../service/PaymentService.js';

const Contribute = () => {
  const [data, setData] = useState([])
  const { showError, showSuccess } = useNotification();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await getMemberships().then(res => {
      if (res?.code === 200) {
        // Merge membership data with benefits from db.json

        // const mergedMemberships = mergeMembershipWithBenefits(res?.data, database);
        // console.log("hehe", mergedMemberships);
        setData(res?.data);

      } else {
        showError(res.message);
      }
    }).catch(err => showError('Lỗi khi lấy danh mục'))
  };

  const mergeMembershipWithBenefits = (memberships, benefitsData) => {
    // Iterate through membership data and add benefits to each membership
    memberships.forEach(membership => {
      const matchingBenefits = benefitsData.membership_benefits.find(item => item.membershipId === membership.id);
      if (matchingBenefits) {
        membership.benefits = matchingBenefits.benefitIds.map(benefitId => {
          const benefit = benefitsData.benefits.find(b => b.id === benefitId);
          return { id: benefit.id, name: benefit.name };
        });
      } else {
        membership.benefits = [];
      }
    });

    return memberships;
  }


  const handleOnClick = async (id,amount) => {
    await getPaymentUrl(id,amount)
    .then(res => {
      if(res?.code === 200){
        console.log(res);
        window.location.href = res?.data?.url

      }
    })
    .catch(error => console.log(error))
  }


  return (
    data?.length > 0 &&
    <div className='col-12 d-flex justify-content-center'>
      <div className='col-10 row d-flex contribute'>
        {
          data.map((mem, idx) =>

            <div key={idx} className='col-3 m-3 tab' onClick={() => handleOnClick(mem?.id, mem?.feeMember)}>
              <div className='text-center py-2'>{mem?.nameSubscription}</div>
              <div className='text-center py-2' style={{ fontSize: '3rem' }}>{mem?.feeMember} VND</div>

              {
                mem?.benefits.map((b, idx) => (
                  <ul key={idx}>
                    <li>
                      {b?.name}

                    </li>
                  </ul>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Contribute