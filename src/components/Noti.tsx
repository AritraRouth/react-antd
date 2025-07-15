import React from 'react';
import { Button, Modal } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Noti: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <Button type="primary" onClick={showLoading}>
       <MailOutlined/>
      </Button>
      <Modal
        title={<p>Loading</p>}
        footer={
          <Button type="primary" className="w-[34em]" onClick={showLoading}>
            View all Notifiation
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Some Notification...</p>
                <p>Some Notification...</p>
                        <p>Some Notification...</p>
      </Modal>
    </>
  );
};

export default Noti;