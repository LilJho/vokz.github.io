import PatientsOverview from '@/components/views/dashboard/PatientsOverview'
import React from 'react'
import { PatientsActivityService } from '@/services/databaseServices'

const DashboardPage = async () => {
    const data = await PatientsActivityService.getAll()
    return (
        // <PatientsOverview data={data} />
        <div className="card">
            <div className="card-body">
                <ul className="nav nav-tabs nav-success" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" data-bs-toggle="tab" href="#successhome" role="tab" aria-selected="true">
                            <div className="d-flex align-items-center">
                                <div className="tab-icon"><i className="bx bx-home font-18 me-1"></i>
                                </div>
                                <div className="tab-title">Home</div>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#successprofile" role="tab" aria-selected="false" tabindex="-1">
                            <div className="d-flex align-items-center">
                                <div className="tab-icon"><i className="bx bx-user-pin font-18 me-1"></i>
                                </div>
                                <div className="tab-title">Profile</div>
                            </div>
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#successcontact" role="tab" aria-selected="false" tabindex="-1">
                            <div className="d-flex align-items-center">
                                <div className="tab-icon"><i className="bx bx-microphone font-18 me-1"></i>
                                </div>
                                <div className="tab-title">Contact</div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="tab-content py-3">
                    <div className="tab-pane fade active show" id="successhome" role="tabpanel">
                        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi.</p>
                    </div>
                    <div className="tab-pane fade" id="successprofile" role="tabpanel">
                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                    </div>
                    <div className="tab-pane fade" id="successcontact" role="tabpanel">
                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage