import {App} from 'vue';
import 'element-plus/theme-chalk/index.css';
import {ElButton,ElInput,ElRadioGroup,ElRadio,ElCollapse,ElCollapseItem,ElMessage,ElMessageBox,ElImage,ElAvatar} from 'element-plus';

export default function setupElementPlus(app:App):void {
    app.use(ElButton);
    app.use(ElInput);
    app.use(ElRadioGroup);
    app.use(ElRadio);
    app.use(ElCollapse);
    app.use(ElCollapseItem);
    app.use(ElMessage);
    app.use(ElMessageBox);
    app.use(ElImage);
    app.use(ElAvatar);
}
