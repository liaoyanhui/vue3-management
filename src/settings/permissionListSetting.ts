/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-04-12 09:23:34
 * @LastEditors: shangxia
 * @LastEditTime: 2023-09-25 15:06:26
 */
/*
 * @Description: 所有按钮权限的列表
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-04-12 09:23:34
 * @LastEditors: shangxia
 * @LastEditTime: 2023-09-25 10:25:35
 */

const permissionListSetting = {
  /**
   * 系统管理 - 人员管理
   */
  // 添加人员
  USER_ENTITY_ADD: 'user:entity:add',
  // 更新用户
  USER_ENTITY_UPDATE: 'user:entity:update',
  // 删除用户
  USER_ENTITY_DELETE: 'user:entity:delete',
  // 用户详情
  USER_QUERY_ENTITY: 'user:query:entity',
  // 用户设置权限
  USER_ENTITY_UPDATE_MENU: 'user:entity:update:menu',

  /**
   * 系统管理 - 系统设置 - 权限设置
   */
  // 添加组
  ROLE_ENTITY_ADD: 'role:entity:add',
  // 更新组
  ROLE_ENTITY_UPDATE: 'role:entity:update',
  // 删除组
  ROLE_ENTITY_DELETE: 'role:entity:delete',
  // 设置组 权限
  ROLE_ENTITY_UPDATE_MENU: 'role:entity:update:menu',
  /**
   * 系统管理 - 系统设置 - 菜单设置
   */
  // 添加菜单
  MENU_ENTITY_ADD: 'menu:entity:add',
  // 更新菜单
  MENU_ENTITY_UPDATE: 'menu:entity:update',
  // 删除菜单
  MENU_ENTITY_DELETE: 'menu:entity:delete',
  // 更新菜单排序
  MENU_ENTITY_UPDATE_SEQUENCE: 'menu:entity:update:sequence',
  // 移动菜单
  MENU_ENTITY_MOVE: 'menu:entity:move',
  // 菜单禁用
  MENU_ENTITY_UPDATE_DISABLE: 'menu:entity:update:disable',

  /**
   * 品牌管理
   */
  // 添加品牌
  BRAND_ENTITY_ADD: 'brand:entity:add',
  // 更新品牌
  BRAND_ENTITY_UPDATE: 'brand:entity:update',
  // 删除品牌
  BRAND_ENTITY_DELETE: 'brand:entity:delete',

  /**
   * 广告管理
   */
  // 添加广告
  ADVERTISEMENT_ENTITY_ADD: 'advertisement:entity:add',
  // 更新广告
  ADVERTISEMENT_ENTITY_UPDATE: 'advertisement:entity:update',
  // 审核广告
  ADVERTISEMENT_ENTITY_CHECK: 'advertisement:entity:check',
  // 删除广告
  ADVERTISEMENT_ENTITY_DELETE: 'advertisement:entity:delete',
  // 添加广告分类
  ADVERTISEMENTCLASS_ENTITY_ADD: 'advertisementclass:entity:add',
  // 更新广告分类
  ADVERTISEMENTCLASS_ENTITY_UPDATE: 'advertisementclass:entity:update',
  // 删除广告分类
  ADVERTISEMENTCLASS_ENTITY_DELETE: 'advertisementclass:entity:delete',
  // 更新广告分类显示状态
  ADVERTISEMENTCLASS_ENTITY_UPDATE_SHOW: 'advertisementclass:entity:update:show',
  // // 审核广告分类
  // ADVERTISEMENTCLASS_ENTITY_CHECK: 'advertisementclass:entity:check',
  // 更新广告分类排序
  ADVERTISEMENTCLASS_ENTITY_UPDATE_SEQUENCE: 'advertisementclass:entity:update:sequence',
  // 移动广告分类
  ADVERTISEMENTCLASS_ENTITY_MOVE: 'advertisementclass:entity:move',

  /**
   * 会员管理 - 会员信息列表 待审核会员信息列表
   */
  // 查看会员 会员详情
  MEMBER_QUERY_ENTITY: 'member:query:entity',
  // 更新会员
  MEMBER_ENTITY_UPDATE: 'member:entity:update',
  // 删除会员
  MEMBER_ENTITY_DELETE: 'member:entity:delete',
  // 审核会员
  MEMBER_ENTITY_CHECK: 'member:entity:check',
  // 驳回会员
  MEMBER_ENTITY_REVOKECHECK: 'member:entity:revokecheck',

  /**
   * 会员管理 - 待审核编辑会员信息列表
   */
  // 待审核编辑会员 审核
  MEMBEREDIT_ENTITY_CHECK: 'memberedit:entity:check',

  /**
   * 会员资质审核
   */
  // 会员资质审核
  MEMBERPICTURE_ENTITY_CHECK: 'memberpicture:entity:check',
  // 会员资质删除
  MEMBERPICTURE_ENTITY_DELETE: 'memberpicture:entity:delete',

  /**
   * 库存文件
   */
  // 重新上传
  STOCKUPLOAD_ENTITY_UPDATE_REUPLOAD: 'stockupload:entity:update:reupload',
  // 取消上传
  STOCKUPLOAD_ENTITY_UPDATE_CANCEL: 'stockupload:entity:update:cancel',
  // 删除库存上传任务
  STOCKUPLOAD_ENTITY_DELETE: 'stockupload:entity:delete',

  /**
   * 会员申请
   */
  // 审核会员申请
  MEMBERAPPLY_ENTITY_CHECK: 'memberapply:entity:check',

  /**
   * 合同管理 - 合同管理
   */
  // 申请合同
  CONTRACT_ENTITY_ADD: 'contract:entity:add',
  // 审核合同
  CONTRACT_ENTITY_CHECK: 'contract:entity:check',
  // 更新合同绑定用户
  CONTRACT_ENTITY_UPDATE_USER: 'contract:entity:update:user',
  // 更新合同
  CONTRACT_ENTITY_UPDATE: 'contract:entity:update',
  // 删除合同
  CONTRACT_ENTITY_DELETE: 'contract:entity:delete',
  /**
   * 合同管理 - 模板管理
   */
  // 添加模板
  CONTRACTTEMPLATE_ENTITY_ADD: 'contracttemplate:entity:add',
  // 更新模板
  CONTRACTTEMPLATE_ENTITY_UPDATE: 'contracttemplate:entity:update',
  // 删除模板
  CONTRACTTEMPLATE_ENTITY_DELETE: 'contracttemplate:entity:delete',
  // 添加属性
  CONTRACTATTRIBUTE_ENTITY_ADD: 'contractattribute:entity:add',
  // 更新属性
  CONTRACTATTRIBUTE_ENTITY_UPDATE: 'contractattribute:entity:update',
  // 删除属性
  CONTRACTATTRIBUTE_ENTITY_DELETE: 'contractattribute:entity:delete',
  // 设置属性 分页获取属性列表
  CONTRACTATTRIBUTE_QUERY_PAGEDLIST: 'contractattribute:query:pagedlist',
  /**
   * 元器件产品 - 元器件产品分类
   */
  // 添加产品分类
  PRODUCTCLASS_ENTITY_ADD: 'productclass:entity:add',
  // 更新产品分类
  PRODUCTCLASS_ENTITY_UPDATE: 'productclass:entity:update',
  // 更新产品分类显示状态
  PRODUCTCLASS_ENTITY_UPDATE_SHOW: 'productclass:entity:update:show',
  // 更新产品分类排序
  PRODUCTCLASS_ENTITY_UPDATE_SEQUENCE: 'productclass:entity:update:sequence',
  // 删除分类
  PRODUCTCLASS_ENTITY_DELETE: 'productclass:entity:delete',

  /**
   * 元器件产品管理 审核
   */
  // 审核产品
  PRODUCT_ENTITY_CHECKT: 'product:entity:check',
  // 删除待审核产品
  PRODUCT_ENTITY_DELETE_PENDING: 'product:entity:delete:pendingproduct',
  // 删除已审核产品
  PRODUCT_ENTITY_DELETE_REVIEWED: 'product:entity:delete:reviewedproduct',
  // 转移产品分类
  PRODUCT_ENTITY_MOVE: 'product:entity:move',
  // 驳回
  PRODUCT_ENTITY_REVOKECHECKT: 'product:entity:revokecheck',
  /**
   * DataSheet
   */
  // 审核
  DATASHEET_ENTITY_CHECK: 'datasheet:entity:check',
  // 添加
  DATASHEET_ENTITY_ADD: 'datasheet:entity:add',
  // 删除
  DATASHEET_ENTITY_DELETE: 'datasheet:entity:delete',
  //批量上传
  DATASHEET_ENTITY_UPLOAD: 'datasheet:entity:upload',
  //更新
  DATASHEET_ENTITY_UPDATE: 'datasheet:entity:update',

  /**
   * 询报价管理
   */
  // 审核询盘
  BUYORDER_ENTITY_CHECK: 'buyorder:entity:check',
  // 删除询报价管理
  BUYORDER_ENTITY_DELETE_PUBLIC: 'buyorder:entity:deletepublic',

  /**
   * 技术资料 及 分类
   */
  // 添加技术资料分类
  DATACLASS_ENTITY_ADD: 'dataclass:entity:add',
  // 更新技术资料分类
  DATACLASS_ENTITY_UPDATE: 'dataclass:entity:update',
  // 更新技术资料分类显示状态
  DATACLASS_ENTITY_UPDATE_SHOW: 'dataclass:entity:update:show',
  // 删除技术资料分类
  DATACLASS_ENTITY_DELETE: 'dataclass:entity:delete',
  // 更新技术资料分类排序
  DATACLASS_ENTITY_UPDATE_SEQUENCE: 'dataclass:entity:update:sequence',
  // 移动技术资料分类
  DATACLASS_ENTITY_UPDATE_MOVE: 'dataclass:entity:update:move',
  // 添加技术资料
  DATAINFO_ENTITY_ADD: 'datainfo:entity:add',
  // 更新技术资料
  DATAINFO_ENTITY_UPDATE: 'datainfo:entity:update',
  // 删除技术资料
  DATAINFO_ENTITY_DELETE: 'datainfo:entity:delete',
  // 更新技术资料显示
  DATAINFO_ENTITY_UPDATE_SHOW: 'datainfo:entity:update:show',
  // 更新技术资料推荐
  DATAINFO_ENTITY_UPDATE_RECOMMEND: 'datainfo:entity:update:recommend',

  /**
   * 电路图 及 分类
   */
  // 添加电路图分类
  CIRCUITCLASS_ENTITY_ADD: 'circuitclass:entity:add',
  // 更新电路图分类
  CIRCUITCLASS_ENTITY_UPDATE: 'circuitclass:entity:update',
  // 更新电路图分类显示状态
  CIRCUITCLASS_ENTITY_UPDATE_SHOW: 'circuitclass:entity:update:show',
  // 更新电路图分类排序
  CIRCUITCLASS_ENTITY_UPDATE_SEQUENCE: 'circuitclass:entity:update:sequence',
  // 移动电路图分类
  CIRCUITCLASS_ENTITY_UPDATE_MOVE: 'circuitclass:entity:update:move',
  // 删除电路图分类
  CIRCUITCLASS_ENTITY_DELETE: 'circuitclass:entity:delete',
  // 添加电路图
  CIRCUIT_ENTITY_ADD: 'circuit:entity:add',
  // 更新电路图
  CIRCUIT_ENTITY_UPDATE: 'circuit:entity:update',
  // 删除电路图
  CIRCUIT_ENTITY_DELETE: 'circuit:entity:delete',
  // 更新电路图显示
  CIRCUIT_ENTITY_UPDATE_SHOW: 'circuit:entity:update:show',
  // 更新电路图推荐
  CIRCUIT_ENTITY_UPDATE_RECOMMEND: 'circuit:entity:update:recommend',
};

export default permissionListSetting;
