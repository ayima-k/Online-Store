import React from 'react'
import { Rating } from '@mui/material'
import { Box } from '@mui/system'
import cls from './Reviews.module.scss'

function Reviewer({id, name, date, content, grade, photo}) {

	return (
		<React.Fragment>
			<div className={cls.block}>
				<div className={cls.review}>
          <div className={cls.div}>
            <div className={cls.header}>
              {
                photo?.length > 6 || photo ? (
                  <div className={cls.profileImg}>
                    <img src={photo} alt="profile img"/>
                  </div>
                ) : (
                  <div className={cls.profileImg}>
                    <img src='https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg' alt="" />
                  </div>
                )
              }
            </div>
            <div className={cls.body}>
              <div>
                <h3>{name}</h3>
                <span className={cls.date}>{date}</span>
                <Box
                  sx={{
                    '& > legend': { mt: 2 },
                  }}
                >
                  <Rating
                    readOnly
                    name="read-only"
                    value={grade}
                    className={cls.rating}
                  />
                </Box>
                <p>{content}</p>
              </div>
            </div>
          </div>
        </div>
			</div>
		</React.Fragment>
	)
}

export default Reviewer