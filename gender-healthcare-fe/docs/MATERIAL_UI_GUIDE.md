# HƯỚNG DẪN SỬ DỤNG MATERIAL UI

## Giới thiệu

Material UI là thư viện UI phổ biến cho React, triển khai Material Design của Google. Tài liệu này cung cấp tổng quan về các components phổ biến nhất, cách sử dụng và các ví dụ.

---

## Mục lục

1. [Cài đặt](#cài-đặt)
2. [Layout Components](#layout-components)
   - [Container](#container)
   - [Grid](#grid)
   - [Box](#box)
   - [Stack](#stack)
3. [Navigation Components](#navigation-components)
   - [AppBar](#appbar)
   - [Drawer](#drawer)
   - [Tabs](#tabs)
   - [BottomNavigation](#bottomnavigation)
4. [Feedback Components](#feedback-components)
   - [Dialog](#dialog)
   - [Snackbar](#snackbar)
   - [CircularProgress](#circularprogress)
5. [Inputs & Controls](#inputs--controls)
   - [Button](#button)
   - [TextField](#textfield)
   - [Select](#select)
   - [Checkbox & Radio](#checkbox--radio)
   - [Switch](#switch)
   - [DatePicker](#datepicker)
6. [Data Display](#data-display)
   - [Typography](#typography)
   - [Card](#card)
   - [Table](#table)
   - [List](#list)
   - [Avatar](#avatar)
   - [Badge](#badge)
7. [Templates & Patterns](#templates--patterns)
8. [Styling](#styling-trong-material-ui)

---

## Cài đặt

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Đối với dự án sử dụng styled-components, có thể cài:

```bash
npm install @mui/material @mui/icons-material @mui/styled-engine-sc styled-components
```

---

## Layout Components

### Container

**Công dụng**: Tạo một container có chiều rộng hạn chế và căn giữa nội dung.

**Props phổ biến:**

- `maxWidth`: 'xs', 'sm', 'md', 'lg', 'xl' (độ rộng tối đa)
- `fixed`: Boolean (chiều rộng cố định thay vì linh hoạt đến maxWidth)
- `disableGutters`: Boolean (bỏ padding ngang)

**Ví dụ:**

```jsx
import { Container } from "@mui/material";

<Container maxWidth="lg">{/* Content */}</Container>;
```

### Grid

**Công dụng**: Tạo layout responsive với hệ thống lưới 12 cột.

**Props phổ biến:**

- `container`: Đánh dấu grid container
- `item`: Đánh dấu grid item
- `xs`, `sm`, `md`, `lg`, `xl`: Số cột chiếm (1-12) ở mỗi breakpoint
- `spacing`: Khoảng cách giữa các items (1 = 8px)
- `direction`: 'row', 'column', 'row-reverse', 'column-reverse'
- `justifyContent`: 'flex-start', 'center', 'flex-end', 'space-between', 'space-around'
- `alignItems`: 'flex-start', 'center', 'flex-end', 'stretch', 'baseline'

**Ví dụ:**

```jsx
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>
    {/* Chiếm 12 cột trên mobile, 6 cột trên màn hình trung bình */}
  </Grid>
  <Grid item xs={12} md={6}>
    {/* Chiếm 12 cột trên mobile, 6 cột trên màn hình trung bình */}
  </Grid>
</Grid>
```

### Box

**Công dụng**: Component linh hoạt để tạo khối nội dung với các thuộc tính CSS thông qua hệ thống `sx`.

**Props phổ biến:**

- `sx`: Object chứa CSS properties với cú pháp ngắn gọn
- `component`: Thành phần HTML/React để render (mặc định là 'div')

**Ví dụ:**

```jsx
<Box
  sx={{
    p: 2, // padding: 16px
    m: 1, // margin: 8px
    bgcolor: "primary.main",
    color: "white",
    borderRadius: 2,
    boxShadow: 1,
  }}
>
  {/* Content */}
</Box>
```

### Stack

**Công dụng**: Sắp xếp các items theo chiều dọc hoặc ngang với khoảng cách đều nhau.

**Props phổ biến:**

- `direction`: 'row', 'column', 'row-reverse', 'column-reverse'
- `spacing`: Khoảng cách giữa các thành phần con
- `alignItems`, `justifyContent`: Căn chỉnh các items

**Ví dụ:**

```jsx
<Stack direction="column" spacing={2}>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
```

---

## Navigation Components

### AppBar

**Công dụng**: Tạo thanh điều hướng cấp cao cho ứng dụng.

**Props phổ biến:**

- `position`: 'fixed', 'absolute', 'sticky', 'static', 'relative'
- `color`: 'default', 'primary', 'secondary', 'transparent', 'inherit'
- `elevation`: Mức độ bóng đổ (0-24)

**Ví dụ:**

```jsx
<AppBar position="static">
  <Toolbar>
    <IconButton color="inherit" edge="start">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" sx={{ flexGrow: 1 }}>
      App Title
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
```

### Drawer

**Công dụng**: Tạo panel trượt từ cạnh màn hình, thường dùng cho menu.

**Props phổ biến:**

- `open`: Boolean (kiểm soát trạng thái mở)
- `anchor`: 'left', 'right', 'top', 'bottom'
- `variant`: 'permanent', 'persistent', 'temporary'
- `onClose`: Callback khi drawer đóng

**Ví dụ:**

```jsx
<Drawer anchor="left" open={open} onClose={handleClose}>
  <List>
    <ListItem button onClick={() => navigate("/home")}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    {/* Thêm các menu items khác */}
  </List>
</Drawer>
```

### Tabs

**Công dụng**: Tạo giao diện tabs để chuyển đổi giữa các views.

**Props phổ biến:**

- `value`: Giá trị của tab hiện tại
- `onChange`: Callback khi tab thay đổi
- `indicatorColor`, `textColor`: 'primary', 'secondary', 'inherit'
- `variant`: 'standard', 'fullWidth', 'scrollable'
- `orientation`: 'horizontal', 'vertical'

**Ví dụ:**

```jsx
const [value, setValue] = useState(0);

<Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
  <Tab label="Item One" />
  <Tab label="Item Two" />
  <Tab label="Item Three" />
</Tabs>;

{
  /* Tab panels */
}
{
  value === 0 && <TabPanel>Content 1</TabPanel>;
}
{
  value === 1 && <TabPanel>Content 2</TabPanel>;
}
{
  value === 2 && <TabPanel>Content 3</TabPanel>;
}
```

### BottomNavigation

**Công dụng**: Tạo thanh điều hướng phía dưới cho mobile apps.

**Props phổ biến:**

- `value`: Giá trị hiện tại
- `onChange`: Callback khi item được chọn
- `showLabels`: Boolean (hiển thị nhãn)

**Ví dụ:**

```jsx
const [value, setValue] = useState(0);

<BottomNavigation
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  <BottomNavigationAction label="Home" icon={<HomeIcon />} />
  <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
  <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
</BottomNavigation>;
```

---

## Feedback Components

### Dialog

**Công dụng**: Tạo hộp thoại modal hiển thị trên nội dung hiện tại.

**Props phổ biến:**

- `open`: Boolean (kiểm soát trạng thái mở)
- `onClose`: Callback khi dialog đóng
- `fullWidth`: Boolean
- `maxWidth`: 'xs', 'sm', 'md', 'lg', 'xl'

**Ví dụ:**

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogTitle>Dialog Title</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Dialog content goes here.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpen(false)}>Cancel</Button>
    <Button onClick={handleConfirm} variant="contained">Confirm</Button>
  </DialogActions>
</Dialog>
```

### Snackbar

**Công dụng**: Hiển thị thông báo ngắn ở phía dưới màn hình.

**Props phổ biến:**

- `open`: Boolean (kiểm soát trạng thái mở)
- `autoHideDuration`: Thời gian tự động đóng (ms)
- `onClose`: Callback khi snackbar đóng
- `message`: Nội dung thông báo
- `action`: Action component (thường là nút đóng)

**Ví dụ:**

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show Snackbar</Button>
<Snackbar
  open={open}
  autoHideDuration={6000}
  onClose={() => setOpen(false)}
  message="Note archived"
  action={
    <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
      <CloseIcon fontSize="small" />
    </IconButton>
  }
/>
```

### CircularProgress

**Công dụng**: Hiển thị vòng loading quay tròn.

**Props phổ biến:**

- `size`: Kích thước (px)
- `thickness`: Độ dày của vòng tròn
- `color`: 'primary', 'secondary', 'inherit'
- `variant`: 'determinate', 'indeterminate'
- `value`: Giá trị tiến trình (0-100) khi variant="determinate"

**Ví dụ:**

```jsx
// Indeterminate
<CircularProgress />

// Determinate
<CircularProgress variant="determinate" value={75} />
```

---

## Inputs & Controls

### Button

**Công dụng**: Tạo nút tương tác.

**Props phổ biến:**

- `variant`: 'contained', 'outlined', 'text'
- `color`: 'primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'
- `size`: 'small', 'medium', 'large'
- `disabled`: Boolean
- `startIcon`, `endIcon`: Icon ở đầu/cuối
- `fullWidth`: Boolean (chiếm toàn bộ chiều rộng container)
- `onClick`: Callback khi nút được nhấn

**Ví dụ:**

```jsx
<Button variant="contained" color="primary" startIcon={<SaveIcon />}>
  Save
</Button>

<Button variant="outlined" color="secondary">
  Cancel
</Button>

<IconButton aria-label="delete">
  <DeleteIcon />
</IconButton>
```

### TextField

**Công dụng**: Tạo input field với nhiều variant.

**Props phổ biến:**

- `variant`: 'outlined', 'filled', 'standard'
- `label`: Nhãn hiển thị
- `value`: Giá trị hiện tại
- `onChange`: Callback khi giá trị thay đổi
- `type`: 'text', 'password', 'email', 'number', etc.
- `multiline`: Boolean (cho phép nhiều dòng)
- `rows`: Số dòng hiển thị khi multiline=true
- `required`: Boolean
- `disabled`: Boolean
- `error`: Boolean
- `helperText`: Text hiển thị dưới input (gợi ý hoặc lỗi)
- `InputProps`: Props cho component Input bên trong
- `InputLabelProps`: Props cho label

**Ví dụ:**

```jsx
const [value, setValue] = useState("");

<TextField
  label="Email"
  variant="outlined"
  type="email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  required
  helperText="We'll never share your email"
  error={!isValidEmail(value)}
/>;
```

### Select

**Công dụng**: Tạo dropdown selection.

**Props phổ biến:**

- `value`: Giá trị hiện tại
- `onChange`: Callback khi giá trị thay đổi
- `label`: Khi được sử dụng với FormControl và InputLabel
- `multiple`: Boolean (cho phép chọn nhiều)
- `displayEmpty`: Boolean (hiển thị item rỗng)
- `renderValue`: Function xử lý hiển thị giá trị đã chọn

**Ví dụ:**

```jsx
const [age, setAge] = useState("");

<FormControl fullWidth>
  <InputLabel id="age-select-label">Age</InputLabel>
  <Select
    labelId="age-select-label"
    value={age}
    label="Age"
    onChange={(e) => setAge(e.target.value)}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>;
```

### Checkbox & Radio

**Công dụng**: Tạo checkbox và radio button.

**Props phổ biến:**

- `checked`: Boolean (trạng thái check)
- `onChange`: Callback khi trạng thái thay đổi
- `color`: 'primary', 'secondary', etc.
- `disabled`: Boolean
- `size`: 'small', 'medium'

**Ví dụ:**

```jsx
// Checkbox
const [checked, setChecked] = useState(false);

<FormControlLabel
  control={
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  }
  label="I agree to terms and conditions"
/>;

// Radio
const [value, setValue] = useState("female");

<RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
  <FormControlLabel value="female" control={<Radio />} label="Female" />
  <FormControlLabel value="male" control={<Radio />} label="Male" />
  <FormControlLabel value="other" control={<Radio />} label="Other" />
</RadioGroup>;
```

### Switch

**Công dụng**: Tạo toggle switch.

**Props phổ biến:**

- `checked`: Boolean (trạng thái bật/tắt)
- `onChange`: Callback khi trạng thái thay đổi
- `color`: 'primary', 'secondary', etc.
- `size`: 'small', 'medium'
- `disabled`: Boolean

**Ví dụ:**

```jsx
const [on, setOn] = useState(false);

<FormControlLabel
  control={
    <Switch
      checked={on}
      onChange={(e) => setOn(e.target.checked)}
      color="primary"
    />
  }
  label="Enable notifications"
/>;
```

### DatePicker

**Công dụng**: Tạo date picker (yêu cầu @mui/x-date-pickers).

**Props phổ biến:**

- `value`: Giá trị ngày đã chọn
- `onChange`: Callback khi ngày thay đổi
- `renderInput`: Function render input field
- `disableFuture`: Boolean
- `disablePast`: Boolean
- `minDate`, `maxDate`: Giới hạn phạm vi ngày

**Cài đặt:**

```bash
npm install @mui/x-date-pickers date-fns
```

**Ví dụ:**

```jsx
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const [date, setDate] = useState(null);

<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label="Select Date"
    value={date}
    onChange={(newValue) => {
      setDate(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>;
```

---

## Data Display

### Typography

**Công dụng**: Hiển thị văn bản một cách nhất quán với các style định sẵn.

**Props phổ biến:**

- `variant`: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'
- `component`: HTML/React element để render (h1, h2, p, span, div,...)
- `align`: 'left', 'center', 'right', 'justify'
- `color`: 'primary', 'secondary', 'error', 'textPrimary', 'textSecondary', etc.
- `gutterBottom`: Boolean (thêm margin-bottom)
- `noWrap`: Boolean (prevent text wrapping)

**Ví dụ:**

```jsx
<Typography variant="h2" component="h1" gutterBottom>
  Heading
</Typography>

<Typography variant="body1" color="textSecondary">
  This is a paragraph with secondary text color.
</Typography>
```

### Card

**Công dụng**: Tạo surface chứa nội dung và hành động liên quan đến một chủ đề.

**Components liên quan:**

- `Card`: Container chính
- `CardHeader`: Header với title, subheader, avatar
- `CardContent`: Nội dung chính
- `CardMedia`: Hiển thị image/video
- `CardActions`: Container cho buttons/actions

**Ví dụ:**

```jsx
<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="/static/images/cards/contemplative-reptile.jpg"
    alt="green iguana"
  />
  <CardHeader title="Card Title" subheader="September 14, 2022" />
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      This is the card content with a description that might span multiple
      lines.
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Share</Button>
    <Button size="small">Learn More</Button>
  </CardActions>
</Card>
```

### Table

**Công dụng**: Hiển thị dữ liệu dạng bảng.

**Components liên quan:**

- `Table`: Container chính
- `TableHead`: Header section
- `TableBody`: Body section
- `TableRow`: Hàng trong bảng
- `TableCell`: Ô trong bảng
- `TablePagination`: Phân trang

**Ví dụ:**

```jsx
<TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="right">Calories</TableCell>
        <TableCell align="right">Fat (g)</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

### List

**Công dụng**: Hiển thị danh sách các items.

**Components liên quan:**

- `List`: Container chính
- `ListItem`: Item trong list
- `ListItemText`: Text content của item
- `ListItemIcon`: Icon của item
- `ListItemButton`: Biến item thành clickable
- `ListItemAvatar`: Avatar của item
- `Divider`: Phân tách giữa các items

**Ví dụ:**

```jsx
<List>
  <ListItem disablePadding>
    <ListItemButton onClick={() => handleClick("Inbox")}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Inbox" />
    </ListItemButton>
  </ListItem>
  <Divider />
  <ListItem disablePadding>
    <ListItemButton onClick={() => handleClick("Drafts")}>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItemButton>
  </ListItem>
</List>
```

### Avatar

**Công dụng**: Hiển thị avatar (hình ảnh đại diện).

**Props phổ biến:**

- `src`: URL của hình ảnh
- `alt`: Text thay thế khi ảnh không load được
- `variant`: 'circular' (mặc định), 'rounded', 'square'
- `sx`: Customize styles (kích thước, màu sắc, etc.)
- `children`: Nội dung hiển thị khi không có src (thường là ký tự hoặc icon)

**Ví dụ:**

```jsx
// Image Avatar
<Avatar src="/static/images/avatar/1.jpg" alt="John Doe" />

// Letter Avatar
<Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>

// Icon Avatar
<Avatar sx={{ bgcolor: 'error.main' }}>
  <DeleteIcon />
</Avatar>
```

### Badge

**Công dụng**: Hiển thị badge nhỏ ở góc component (thường dùng cho thông báo).

**Props phổ biến:**

- `badgeContent`: Nội dung hiển thị trong badge
- `color`: 'primary', 'secondary', 'error', 'warning', 'info', 'success'
- `max`: Giá trị tối đa hiển thị (vượt quá sẽ hiển thị "+")
- `variant`: 'standard', 'dot'
- `invisible`: Boolean (ẩn/hiện badge)
- `overlap`: 'rectangular', 'circular'

**Ví dụ:**

```jsx
// Badge với số
<Badge badgeContent={4} color="primary">
  <MailIcon />
</Badge>

// Badge dạng dot
<Badge variant="dot" color="error">
  <NotificationsIcon />
</Badge>
```

---

## Templates & Patterns

### Layout Patterns

**Dashboard Layout:**

```jsx
<Box sx={{ display: "flex" }}>
  {/* Sidebar */}
  <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
    <Toolbar />
    <Box sx={{ overflow: "auto" }}>
      <List>{/* list items */}</List>
    </Box>
  </Drawer>

  {/* Main content */}
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <Toolbar /> {/* Provides spacing below AppBar */}
    <Typography paragraph>Content goes here...</Typography>
  </Box>
</Box>
```

**Sign-in Form:**

```jsx
<Container component="main" maxWidth="xs">
  <Box
    sx={{
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  </Box>
</Container>
```

---

## Styling trong Material UI

### 1. sx prop

**Công dụng**: Cách nhanh nhất để style một component.

```jsx
<Box
  sx={{
    bgcolor: "background.paper",
    boxShadow: 1,
    borderRadius: 2,
    p: 2,
    minWidth: 300,
  }}
>
  Content
</Box>
```

### 2. styled API

**Công dụng**: Tạo component với style tùy chỉnh (tương tự styled-components).

```jsx
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  margin: theme.spacing(1),
}));

// Sử dụng
<StyledButton>Custom Button</StyledButton>;
```

### 3. Theme Customization

**Công dụng**: Tùy chỉnh theme toàn cục cho ứng dụng.

```jsx
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
  spacing: 8, // Define base spacing unit (8px)
  shape: {
    borderRadius: 4, // Default border radius
  },
  components: {
    // Override component styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
```

---

## Mẹo sử dụng Material UI hiệu quả

1. **Tận dụng theme**: Sử dụng theme cho màu sắc, spacing để đảm bảo UI nhất quán

2. **Responsive design**: Sử dụng breakpoints của Material UI

   ```jsx
   <Box sx={{
     width: {
       xs: '100%', // 0px+
       sm: '80%',  // 600px+
       md: '60%',  // 900px+
       lg: '40%',  // 1200px+
       xl: '30%',  // 1536px+
     }
   }}>
   ```

3. **Custom hooks**: Tái sử dụng logic UI phức tạp

   ```jsx
   function useFormField(initialValue = "") {
     const [value, setValue] = useState(initialValue);
     const [error, setError] = useState(null);

     return {
       value,
       error,
       onChange: (e) => setValue(e.target.value),
       setError,
       reset: () => setValue(initialValue),
     };
   }
   ```

4. **Composition over configuration**: Chia UI thành các component nhỏ, tái sử dụng

5. **Hiểu hệ thống spacing**: Material UI sử dụng hệ số 8px (1 = 8px, 2 = 16px,...)

6. **Sử dụng Portal**: Cho modals, tooltips và poppers để render bên ngoài container hiện tại

   ```jsx
   import { Portal } from "@mui/base";

   <Portal container={document.body}>
     <SomeModal />
   </Portal>;
   ```

---

## Tài nguyên học tập

1. [Trang chủ Material UI](https://mui.com/)
2. [Tài liệu chính thức](https://mui.com/material-ui/getting-started/)
3. [Component API Reference](https://mui.com/material-ui/api/accordion/)
4. [GitHub repository](https://github.com/mui/material-ui)
5. [Templates](https://mui.com/material-ui/getting-started/templates/)

---

_Tài liệu được tạo và cập nhật: Tháng 05, 2025_
