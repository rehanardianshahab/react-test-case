import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Switch,
  Drawer,
  Button,
  Grid,
} from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  MenuOutlined,
  MoonFilled,
  SunFilled,
} from '@ant-design/icons';

const { Header } = Layout;
const { useBreakpoint } = Grid;

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: 'About',
    },
    {
      key: 'features',
      icon: <BulbOutlined />,
      label: 'Features',
    },
  ];

  return (
    <>
      <Header
        style={{
          backgroundColor: isDark ? '#001529' : '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 16,
        }}
      >
        <div
          className="logo"
          style={{
            color: !isDark ? '#001529' : '#fff',
            fontWeight: 'bold',
            marginRight: '2rem',
            flexShrink: 0,
          }}
        >
          MyApp
        </div>

        {screens.md ? (
          <Menu
            theme={isDark ? 'dark' : 'light'}
            mode="horizontal"
            defaultSelectedKeys={['home']}
            items={menuItems}
            style={{ flex: 1 }}
          />
        ) : (
          <div style={{ flex: 1 }} />
        )}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Switch
            style={{ backgroundColor: 'rgba(200,200,200,.6)' }}
            checked={isDark}
            checkedChildren={<MoonFilled style={{ color: '#fff' }} />}
            unCheckedChildren={<SunFilled style={{ color: 'yellow' }} />}
            onChange={toggleTheme}
          />

          {!screens.md && (
            <Button
              icon={<MenuOutlined />}
              type="text"
              onClick={() => setDrawerVisible(true)}
            />
          )}
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          defaultSelectedKeys={['home']}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
