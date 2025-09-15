const MyProfile = ({ user }) => {

  return (
    <>
     <div className="col-xl-3 col-xxl-4">
            
								<div className="card">
									<div className="card-header border-0">
										<h4 className="mb-0 text-black fs-20">My Profile</h4>
									</div>
									<div className="card-body">
										<div className="text-center mb-5">
											<div className="my-profile">
												<img src={user?.image} alt="" className="rounded-circle" />
												<a href="javascript:void(0);"><i className="fa fa-pencil" aria-hidden="true"></i></a>
											</div>
											<h4 className="mt-4 font-w600 text-black mb-0 name-text ">{user?.displayName}</h4>
											<span>{user?.email}</span>
										
										</div>
										 
									</div>
								</div>
							
               </div>
    </>
  )

}
export default MyProfile;