import { Col, Row, Statistic, Typography } from "antd"
import React from "react"
import PageLayout from "../../components/common/PageLayout"
import { useGetActivitiesQuery } from "../../services/auth/auth"
import VisitCalendar from "../Visit/components/VisitCalendar"
import { useNavigate } from "react-router-dom"
import { buildUrl } from "../../helpers"
import { useGetVisitsQuery } from "../../services/visits"

const Home: React.FC = () => {
    const { isLoading, data } = useGetActivitiesQuery()
    const { data: visits, isLoading: isGettingVisits } = useGetVisitsQuery({});
    const navigate = useNavigate();
    return (
        <PageLayout breadCrumbItems={[]}>
            <Row gutter={18}>
                <Col span={8}>
                    <Statistic loading={isLoading} title="Total Stores" value={data?.totalStores} />
                </Col>
                <Col span={8}>
                    <Statistic loading={isLoading} title="Total Products" value={data?.totalProducts} />
                </Col>
                <Col span={8}>
                    <Statistic loading={isLoading} title="Total Contacts" value={data?.totalContacts} />
                </Col>
                <Col className="mt-8" span={24}>
                    <Typography className="font-semibold text-xl mb-8">
                        Reps Upcoming Visits
                    </Typography>
                    <VisitCalendar loading={isGettingVisits} onViewVisit={({ id }) => {
                        navigate(buildUrl('viewVisit', {
                            id
                        }))
                    }} visits={visits || []} onDateSelect={(date) => { }} />
                </Col>
            </Row>
        </PageLayout>
    )
}

export default Home